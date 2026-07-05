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

    // handles the request for the View Project page
    app.get("/view-project", core_handlers.viewProject);

    // handles the request for the Login page.
    app.get("/login", core_handlers.login);

    // handles the request that checks if owner is logged in.
    app.get("/check-login", core_handlers.checkLogin);

    app.post("/login", core_handlers.attemptLogin);

    app.get("/logout", core_handlers.logout);

    // handles the request for the Edit Project page
    app.get("/edit-project", core_handlers.editProject);
    
    // handles the request for the project's data.
    app.get("/edit-project/:name", core_handlers.getProject);

    // handles the request to update a project's data.
    app.put("/edit-project/:name", core_handlers.updateProject);

    // handles the request to add a new project
    app.post("/edit-project", core_handlers.addProject);

    // handles the request to delete a project.
    app.delete("/edit-project/:name", core_handlers.deleteProject);

    // handles the request to get all the projects
    app.get("/projects", core_handlers.getProjects);
}

/** 
 * Registers core request handlers.
*/
module.exports.routes = {
    registerRequestHandlers
}