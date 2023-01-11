require('dotenv').config();
var mysql = require('mysql2');

env.config();

var con = mysql.createConnection({
    host: '',
    user: '',
    password: ''
});

async () => {
    await con.connect((err) => {
        if(err) {
            throw err;
            console.log(err);
        }

        console.log('connected to database');
    });
}

console.log(process.env);