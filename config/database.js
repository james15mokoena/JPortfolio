const mysql = require("mysql2/promise");

const connectionPool = mysql.createPool({
    host: process.env.DB_JPORTFOLIO_HOST,
    user: process.env.DB_JPORTFOLIO_USER,
    password: process.env.DB_JPORTFOLIO_PASSWORD,
    port: process.env.DB_JPORTFOLIO_PORT,
    database: process.env.DB_JPORTFOLIO_NAME
});

connectionPool.getConnection(function (err, connection) {
   
    if (err) {
        console.error(`Failed to connect to the database: ${err.message}`);
        return;
    }

    console.log("Connected to the database!!!");
    connection.release();   // return the connection to the pool
});

module.exports = connectionPool;