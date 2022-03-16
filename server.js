const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',

        user: 'root',

        password: 'mysqllogin',

        database: 'employees_db'
    },
    console.log('Successfully conneted to the employees_db database!')
);

db.query('SELECT first_name, last_name FROM employee;', (err, results) => {
    err ? console.log(err) : console.log(results)
})








app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});