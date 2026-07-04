// imports
const express = require("express");
const handlebars = require("express-handlebars");
const session = require("./config/session.js");
const { routes } = require("./routes.js");
const db = require("./config/database.js");

// create an instance of express-handlebars.
const hbars = handlebars.create({ defaultLayout: "main", partialsDir: "views/partials" });

// create the app
const app = express();
// register the handlebars engine with the app.
app.engine("handlebars", hbars.engine);
app.set("view engine", "handlebars");

// register middleware

// enable the serving of static files in the /public folder
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// enable the use of sessions
app.use(session);

// register core request handlers
routes.registerRequestHandlers(app);

app.listen(4000, function () {
    console.log(`JPortfolio is running on port: 4000...`);
});