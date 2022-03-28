const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const { json } = require('express/lib/response');
const res = require('express/lib/response');

const db = mysql.createConnection(
    {
        host: 'localhost',

        user: 'root',

        password: 'mysqllogin',

        database: 'employees_db'
    },
    console.log('Successfully conneted to the employees_db database!')
);

let departmentArray = []

function departmentList() {
    db.query('SELECT id FROM department;', (err, results) => {
        err ? console.log(err) : results
        results.map((result) => {
            departmentArray.push(result.id)
        })
    });
}

let roleArray = []

function roleList() {
    db.query('SELECT id FROM role;', (err, results) => {
        err ? console.log(err) :
        results.map((result) => {
            roleArray.push(result.id)
        })
    });
}

let managerArray = []

function managerList() {
    db.query('SELECT id FROM employee;', (err, results) => {
        err ? console.log(err) :
        results.map((result) => {
            managerArray.push(result.id)
        })
    });
}

let employeeArray = []

function employeeList() {
    db.query('SELECT first_name FROM employee;', (err, results) => {
        err ? console.log(err) :
        // console.log(results)
        results.map((result) => {
            employeeArray.push(result.first_name)
        })
        // console.log(employeeArray)
    });
}

function mainPrompt() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'todo',
                choices:
                    [
                        'View all departments',
                        'View all roles',
                        'View all employees',
                        'Add a department',
                        'Add a role',
                        'Add an employee',
                        'Update an employee'
                    ]
            }
        ])
        .then((response) => {
            if (response.todo === 'View all employees') {
                getEmployeeList();
                setTimeout(mainPrompt, 3000);
            } else if (response.todo === 'View all roles') {
                getRoles();
                setTimeout(mainPrompt, 3000);
            } else if (response.todo === 'View all departments') {
                getDepartments();
                setTimeout(mainPrompt, 3000);
            } else if (response.todo === 'Add an employee') {
                addEmployee();
            } else if (response.todo === 'Add a role') {
                addRole();
            } else if (response.todo === 'Add a department') {
                addDepartment();
            } else if (response.todo === 'Update an employee') {
                updateEmployee();
            }
        });
}

function addDepartment () {
    inquirer
        .prompt ([
            {
                type: 'input',
                message: 'Please type the name of the new department..',
                name: 'newDepartmentName'
            }
        ])
        .then((response) => {
            db.query(`INSERT INTO department (name) 
                        VALUES('${response.newDepartmentName}')`, 
                        (err, results) => err ? console.log(err) : console.log(`${response.newDepartmentName} successfully added!`)
            );
            setTimeout(mainPrompt, 3000);
        })
        .catch((err) => console.log(err))
}

function addRole () {
    departmentList()
    inquirer
        .prompt ([
            {
                type: 'input',
                message: 'Please type the title of the new role..',
                name: 'newRoleTitle'
            },
            {
                type: 'input',
                message: 'Please type the salary of the new role..',
                name: 'newRoleSalary'
            },
            {
                type: 'list',
                message: 'What is the department id for the new role?',
                choices: departmentArray,
                name: 'departmentId'
            }
        ])
        .then((response) => {
            db.query(`INSERT INTO role (title, salary, department_id) 
                        VALUES('${response.newRoleTitle}', ${response.newRoleSalary}, ${response.departmentId})`, 
                        (err, results) => err ? console.log(err) : console.log(`${response.newRoleTitle} successfully added!`)
            );
            setTimeout(mainPrompt, 3000);
        })
        .catch((err) => console.log(err))
}

function addEmployee () {
    roleList()
    managerList()
    inquirer
        .prompt ([
            {
                type: 'input',
                message: 'What is the first name of the new employee?',
                name: 'newEmployeeFirst'
            },
            {
                type: 'input',
                message: 'What is the last name of the new employee?',
                name: 'newEmployeeLast'
            },
            {
                type: 'list',
                message: 'Please select the role id for the new employee..',
                choices: roleArray,
                name: 'newEmployeeRole'
            },
            {
                type: 'list',
                message: 'Please select the manager ID for the new employee',
                choices: managerArray,
                name: 'newEmployeeManager'
            }
        ])
        .then((response) => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                        VALUES('${response.newEmployeeFirst}', '${response.newEmployeeLast}', ${response.newEmployeeRole}, ${response.newEmployeeManager})`, 
                        (err, results) => err ? console.log(err) : console.log(`${response.newEmployeeFirst} ${response.newEmployeeLast} successfully added!`)
            );
            setTimeout(mainPrompt, 3000);
        })
        .catch((err) => console.log(err))
}

async function updateEmployee () {
    employeeList()
    // console.log('197', employeeArray)
    inquirer
        .prompt ([
            {
                type: 'confirm',
                message: 'Are you sure you would like to update an Employee role?',
                default: true,
                name: 'yesOrNo'
            },
        ])
        .then((response) => {
            if (response.yesOrNo === true) {
                updateFollowup()
            } else {
                mainPrompt()
            }
        })
}

function updateFollowup () {
    inquirer
        .prompt ([
            {
                type: 'list',
                message: 'Which employee role would you like to update?',
                choices: employeeArray,
                name: 'updateChoice'
            }
        ])
        .then ((response) => {
            updateRole(response.updateChoice)
        })
}

function updateRole (employeename) {
    inquirer
        .prompt ([
            {
                type: 'input',
                message: `Please enter the new role id for ${employeename}`,
                name: 'newRole'
            }
        ])
        .then ((response) => {

            var resNum = parseInt(response.newRole)

            if (Number.isInteger(resNum)) {
            db.query(`UPDATE employee SET role_id = ${resNum} WHERE first_name = '${employeename}';`);
            console.log(`${employeename} successfully updated!`);
            setTimeout(mainPrompt, 3000);
            } else {
                console.log('Please enter a valid number')
                setTimeout(updateRole(employeename), 3000)
            }
        })
}

function getEmployeeList () {
    db.query('SELECT * FROM employee RIGHT JOIN role ON employee.role_id = role.id;', (err, results) => {
        err ? console.log(err) : console.table(results)
    });
}

function getRoles () {
    db.query('SELECT title, id, department_id AS department FROM role;', (err, results) => {
        err ? console.log(err) : console.table(results)
    });
}

function getDepartments () {
    db.query('SELECT name, id FROM department;', (err, results) => {
        err ? console.log(err) : console.table(results)
    });
}

roleList()
mainPrompt()
// departmentList()