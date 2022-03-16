const inquirer = require('inquirer');

function mainPrompt() {
    inquirer
        .prompt [
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'firstChoices',
                choices:
                    [
                        'View all departments',
                        'View all roles',
                        'View all empoyees',
                        'Add a Department',
                        'Add a role',
                        'Add an employee',
                        'Update an employee role'
                    ]
            }
        ]
        .then(mainPromptAnswers)
}

function addDepartment () {
    inquirer
        .prompt [
            {
                type: 'input',
                message: 'Please type the name of the new department..',
                name: 'newDepartmentName'
            }
        ]
        .then(addDepartmentAnswers)
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
    fetch ('SELECT first_name, last_name FROM employee;');
}