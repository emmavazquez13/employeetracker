const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env[''],
        database: 'employee_tracker'
    },
    console.log('Connected to the employee_tracker database.')
);

module.exports = {connection};