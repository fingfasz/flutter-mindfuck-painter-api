require('dotenv').config();
const express = require('express');
const server = express();
const usersRouter = require('./routes/users_router');
const http = require('http');
const https = require('https');

// const Db = require('mysql2-async').default;

// const db = new Db({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSW,
//     database: process.env.MYSQL_DATABASE
// });

// async function main(){
//     console.log(await db.query("SHOW TABLES;"));
// }

// main();

server.use(express.json());
server.use(express.urlencoded({ extended: true}));
server.use('/users', usersRouter);

server.listen(process.env.API_PORT, (err) => {
    if (err) {
        console.log(`Server startup error: ${err}`);
    } else {
        console.log(`Server listening on port: ${process.env.API_PORT}`);
    }
});