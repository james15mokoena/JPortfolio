const db = require("../config/database.js");
const Project = require("../models/project.js");

/**
 * Handles the request for the home page.
 * @param {import("express").Request} req The request object.
 * @param {import("express").Response} res The response object.
 */
async function home(req, res) {
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

        if (project === null) {
            res.status(404).send("Not Found");
        }
        else
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

        if (isUpdated === false)
            res.status(404).send("Failed to update the project.");
        else
            res.send();
    }
}

/**
 * Checks if the requires fields of the project have acceptable values, that is, they
 * do not have `" "` empty strings.
 * @param {*} project The project.
 * @returns true if the all the data is acceptable, otherwise false.
 */
function isProjectDataValid(project) {
    
    if (isNotNullOrEmpty(project.ownerUsername) && isNotNullOrEmpty(project.name) &&
        isNotNullOrEmpty(project.problem) && isNotNullOrEmpty(project.solution) &&
        isNotNullOrEmpty(project.revenueImpact) && isNotNullOrEmpty(project.costImpact) &&
        isNotNullOrEmpty(project.timeImpact) && project.iconLocation !== null && project.iconLocation !== undefined &&
        project.videoLocation !== null && project.videoLocation !== undefined) {
        return true;
    }

    return false;
}

/**
 * Checks if a string value is not null, undefined or an empty string.
 * @param {string} strValue 
 * @returns true if not null, undefined or empty string, otherwise false.
 */
function isNotNullOrEmpty(strValue) {

    if (strValue !== null && strValue !== undefined && strValue !== "")
        return true;

    return false;
}

/**
 * Handles the request to add a new project.
 * @param {import("express").Request} req The request object.
 * @param {import("express").Response} res The response object.
 */
async function addProject(req, res) {

    if (req.body !== null && req.body !== undefined) {
        
        const owner = await db.getOwner();
        
        if (owner !== undefined && owner !== null) {

            const project = req.body;
            project.ownerUsername = owner.Username;

            if (isProjectDataValid(project) === true) {
                
                const isAdded = await db.addProject(Project.toProject(project));

                if (isAdded === true)
                    res.send("Added");
                else
                    res.status(404).send("Failed");
            }
        }
        else
            res.status(404).send("Failed");
    }
    else
        res.status(404).send("Failed");
}

/**
 * Handles the request to delete a project.
 * @param {import("express").Request} req The request object.
 * @param {import("express").Response} res The response object.
*/
async function deleteProject(req, res) {

    if (req.params.name !== null && req.params.name !== undefined && await db.projectExists(req.params.name)) {
        
        const isDeleted = await db.deleteProject(req.params.name);

        console.log(`Is deleted: ${isDeleted}`);

        if (isDeleted === true)
            res.status(200).send("Deleted");
        else
            res.status(404).send("Failed");
    }
    else
        res.status(404).send("Failed");
}

/**
 * Handles the request to get all the projects.
 * @param {import("express").Request} req The request object.
 * @param {import("express").Response} res The response object.
 */
async function getProjects(req, res) {

    const projects = await db.getProjects();
    
    if (projects !== null && projects !== undefined)
        res.json(projects);
    else
        res.status(404).send("Not projects found");
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
    getProjects,
    updateProject,
    addProject,
    deleteProject
}