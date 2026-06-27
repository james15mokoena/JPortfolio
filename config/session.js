const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const connectionPool = require("./database.js");

const sessionStore = new MySQLStore({}, connectionPool);

// session remains valid for 15 minutes
const FIFTEEN_MINUTES = 15 * 60 * 1000;

module.exports = session({
    secret: "secret", //process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        // set the cookie's expiration to 15 minutes.
        maxAge: FIFTEEN_MINUTES
    }
});