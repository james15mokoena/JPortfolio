const mysql = require("mysql2");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const sessionPool = mysql.createPool({
    host: process.env.DB_JPORTFOLIO_HOST,
    user: process.env.DB_JPORTFOLIO_USER,
    password: process.env.DB_JPORTFOLIO_PASSWORD,
    port: process.env.DB_JPORTFOLIO_PORT,
    database: process.env.DB_JPORTFOLIO_NAME
});

const sessionStore = new MySQLStore({}, sessionPool);

// session remains valid for 15 minutes
const FIFTEEN_MINUTES = 15 * 60 * 1000;

module.exports = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        // set the cookie's expiration to 15 minutes.
        maxAge: FIFTEEN_MINUTES
    }
});