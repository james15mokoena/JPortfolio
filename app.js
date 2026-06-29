// imports
const express = require("express");
const handlebars = require("express-handlebars");
const session = require("./config/session.js");
const {routes} = require("./routes.js");

// create an instance of express-handlebars.
const hbars = handlebars.create({ defaultLayout: "main" });

// create the app
const app = express();
// register the handlebars engine with the app.
app.engine("handlebars", hbars.engine);
app.set("view engine", "handlebars");

// register middleware

// enable the serving of static files in the /public folder
app.use(express.static(__dirname + "/public"));

// enable the use of sessions
app.use(session);

// register core request handlers
routes.registerRequestHandlers(app);

app.listen(4000, function () {
    console.log(`JPortfolio is running on port: 4000...`);
});

// IP ADDRESS: "192.168.43.172"