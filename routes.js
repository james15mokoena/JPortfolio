const {core_handlers} = require("./request_handlers/core_handlers.js");

/**
 * Registers all request handlers with the application.
 * @param {import("express").Express} app An Express application.
 */
function registerRequestHandlers(app) {
    
    // handles the request for the Home page.
    app.get("/", core_handlers.home);

    // handles the request for the About page.
    app.get("/about", core_handlers.about);

    // handles the request for the Edit Project page
    app.get("/edit-project", core_handlers.editProject);

    // handles the request for the View Project page
    app.get("/view-project", core_handlers.viewProject);

    // handles the request for the Login page.
    app.get("/login", core_handlers.login);
}

/** 
 * Registers core request handlers.
*/
module.exports.routes = {
    registerRequestHandlers
}