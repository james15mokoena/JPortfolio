/**
 * Handles the request for the home page.
 * @param {import("express").Request} req The request object.
 * @param {import("express").Response} res The response object.
 */
function home(req, res) {
    res.render("home");
}

/**
 * Handles the request for the About page.
* @param {import("express").Request} req The request object.
* @param {import("express").Response} res The response object.
 */
function about(req, res) {
    res.render("about");
}

/**
 * Handles the request for the Edit Project page.
* @param {import("express").Request} req The request object.
* @param {import("express").Response} res The response object.
 */
function editProject(req, res) {
    res.render("edit-project");
}

/**
 * Handles the request for the View Project page.
* @param {import("express").Request} req The request object.
* @param {import("express").Response} res The response object.
 */
function viewProject(req, res) {
    res.render("view-project");
}

/**
 * Handles the request for the View Project page.
* @param {import("express").Request} req The request object.
* @param {import("express").Response} res The response object.
 */
function login(req, res) {
    res.render("login");
}

/**
 * An object that contains the request handlers to be exported.
 */
module.exports.core_handlers = {
    home,
    about,
    editProject,
    viewProject,
    login
}