const db = require("../config/database.js");
const Project = require("../models/project.js");

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
 * Handles the request to get a project's data.
 * @param {import("express").Request} req The request object.
 * @param {import("express").Response} res The response object.
 * @returns a project's data.
 */
async function getProject(req, res) {
    
    if (req.params.name !== null && req.params.name !== undefined) {
        const project = await db.getProject(req.params.name);
        res.status(200).json(project);
    }
}

/**
 * 
 * @param {import("express").Request} req The request object.
 * @param {import("express").Response} res The response object.
 */
async function updateProject(req, res) {

    if (req.body !== null && req.body !== undefined) {
        
        const project = req.body;
        
        const proj = new Project(
            null, project.name, project.problem, project.solution, project.revenueImpact,
            project.costImpact, project.timeImpact, project.iconLocation, project.videoLocation);

        const isUpdated = await db.updateProject(proj);

        res.send(`Is updated: ${isUpdated}`);
    }
}

/**
 * An object that contains the request handlers to be exported.
 */
module.exports.core_handlers = {
    home,
    about,
    editProject,
    viewProject,
    login,
    getProject,
    updateProject
}