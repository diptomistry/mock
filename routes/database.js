//const mysql = require('mysql');
const { createPool } = require('mysql2');//to specify the method we want to use from the mysql package
const pool = createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10
});
module.exports = pool;//export the pool object to be used in other files