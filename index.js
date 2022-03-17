const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',

        user: 'root',

        password: 'mysqllogin',

        database: 'employees_db'
    },
    console.log('Successfully conneted to the employees_db database!')
);

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
                        'Update an employee role'
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
            } else if (response.todo === 'Update an employee role') {
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
    inquirer
        .prompt [
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
                type: 'choices',
                message: 'What department is the new role under?',
                choices: [],
                name: 'newRoleSalary'
            }
        ]
        .then(addRoleAnswers)
}

function addEmployee () {
    inquirer
        .prompt [
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
                type: 'input',
                message: 'Please enter the role id for the new employee..',
                name: 'newEmployeeRole'
            },
            {
                type: 'input',
                message: 'Please enter the manager id for the new employee..',
                name: 'newEmployeeManager'
            }
        ]
}

function updateEmployee () {
    inquirer
        .prompt [
            {
                type: 'input',
                message: 'Which employee would you like to update?',
                name: 'employeeUpdateChoice'
            }
        ]
        .then(updateEmployeeChoice)
}

function getEmployeeList () {
    db.query('SELECT first_name, last_name FROM employee;', (err, results) => {
        err ? console.log(err) : console.table(results)
    });
}

function getRoles () {
    db.query('SELECT title FROM role;', (err, results) => {
        err ? console.log(err) : console.table(results)
    });
}

function getDepartments () {
    db.query('SELECT name FROM department;', (err, results) => {
        err ? console.log(err) : console.table(results)
    });
}


mainPrompt()