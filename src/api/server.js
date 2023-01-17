require('dotenv').config();
const Db = require('mysql2-async').default;

const db = new Db({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSW,
    database: process.env.MYSQL_DATABASE,
    timezone: ''
});

async function main(){
    console.log(await db.query("SHOW TABLES;"));
}

main();