const express = require('express');
// Import and require mysql2
const connection = require('./config/connection');
const inquirer = require('inquirer');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// connection.query('select * from roles;', (err, data) => {
//     if (err) console.log(err)
//     console.log(data)
// })
let initialQuestions = [{
    type: 'list', 
    name: 'operation',
    message: 'Select operation to perform',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee']
}]

let startApp = () => {
    inquirer.prompt(initialQuestions).then((data) => {
        console.log(data);
        if (data.operation === 'View all departments'){
        getDepartments()
        } else if (data.operation === 'View all roles'){
        getRoles()
        } else if (data.operation === 'View all employees'){
        getEmployees()
        } else if (data.operation === 'Add a department'){
        addDeparment()
        } else if (data.operation === 'Add a role'){
        addRole()
        } else if (data.operation === 'Add an employee'){
        addEmployee()
        } else if (data.operation === 'Update an employee'){
        updateEmployee()
        }
    })
}

function getDepartments(){
    connection.query('SELECT * FROM departments;', (err, data) => {
        if (err) console.log(err)
        console.table(data)
        startApp()
    } )
}

function getRoles(){
    connection.query('SELECT * FROM roles;', (err, data) => {
        if (err) console.log(err)
        console.table(data)
        startApp()
    } )
}

function getEmployees(){
    connection.query('SELECT * FROM employees;', (err, data) => {
        if (err) console.log(err)
        console.table(data)
        startApp()
    } )
}

let addDepartmentQuestion = [{
    type: 'input',
    name: 'Add_dept',
    message: 'Enter name of the department'
}]

function addDeparment (){
    inquirer.prompt(addDepartmentQuestion).then(data => {
        let department_name = data.Add_dept;
        let query = `INSERT INTO departments(name) VALUES('${department_name}');`;
        connection.query(query, (err, data) => {
         if (err) console.log(err)
         console.table(data) 
         startApp()
        })
    })
}

let addRoleQuestion = [{
    type: 'input',
    name: 'title',
    message: 'Enter the title of the role'
},{
    type: 'input',
    name: 'salary',
    message: 'Enter the salary of the role'
},{
    type: 'input',
    name: 'department_id',
    message: 'Enter the department id of the role'
}]

function addRole (){
    inquirer.prompt(addRoleQuestion).then(data => {
        let query = `INSERT INTO roles(title, salary, department_id) VALUES('${data.title}', '${data.salary}', '${data.department_id}');`;
        connection.query(query, (err, data) => {
            if (err) console.log(err)
            console.table(data) 
            startApp()
           })
    })
}

let addEmployeeQuestions = [{
    type: 'input',
    name: 'first_name',
    message: 'Enter the first name of the employee'
},{
    type: 'input',
    name: 'last_name',
    message: 'Enter the last name of the employee'
},{
    type: 'input',
    name: 'role_id',
    message: 'Enter the role id of the employee'
},{
    type: 'input',
    name: 'manager_id',
    message: 'Enter the manager id of the employee'
}]

function addEmployee() {
    inquirer.prompt(addEmployeeQuestions).then(data => {
        let query = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES('${data.first_name}', '${data.last_name}', '${data.role_id}', '${data.manager_id}');`;
        connection.query(query, (err, data) => {
            if (err) console.log(err)
            console.table(data) 
            startApp()
           })
    })
}

let updateEmployeeQuestion = [{
    type: 'input',
    name: 'employee_id',
    message: 'Enter the employee id to update'
},{
    type: 'input',
    name: 'role_id',
    message: 'Enter the role_id to update'
}]

function updateEmployee() {
    inquirer.prompt(updateEmployeeQuestion).then(data => {
        let query = `UPDATE employees SET role_id=${data.role_id} WHERE id=${data.employee_id};`;
        connection.query(query, (err, data) => {
            if (err) console.log(err)
            console.table(data) 
            startApp()
           })
    })
}

startApp()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  

