const mysql = require("mysql2/promise");
const Owner = require("../models/owner.js");
const Project = require("../models/project.js");

const pool = mysql.createPool({
    host: process.env.DB_JPORTFOLIO_HOST,
    user: process.env.DB_JPORTFOLIO_USER,
    password: process.env.DB_JPORTFOLIO_PASSWORD,
    port: process.env.DB_JPORTFOLIO_PORT,
    database: process.env.DB_JPORTFOLIO_NAME
});

// check if the connection was successful or not.
pool.getConnection(function (err, connection) {
   
    if (err) {
        console.error(`Failed to connect to the database: ${err.message}`);
        return;
    }

    console.log("Connected to the database!!!");
    connection.release();   // return the connection to the pool
});

/**
 * Gets existing project owners in the database.
 * @returns An array of owners.
 */
async function getOwner() {
    
    const [owners] = await pool.query(`SELECT * FROM Owner LIMIT 1;`);
    /*const owns = [];
    owners.forEach((owner) => {
        if (owner !== undefined) {
            owns.push(owner);
        }
    });*/

    return owners[0];
}

/**
 * Checks if the owner with the given username exists.
 * @param {string} username The owner's username.
 * @returns true if the username is valid, otherwise false.
 */
async function ownerExists(username) {
    
    const [owner] = await pool.query(
        `SELECT Username
         FROM Owner
         WHERE Username = ?;`
        , [username]);
    
    return owner.length > 0;
}

/**
 * Add a new owner to the database.
 * @param {string} username The owner's username.
 * @param {string} password The owner's password.
 * @returns true if the owner is added, otherwise false.
 */
async function addOwner(username, password) {
    
    if (await ownerExists(username) === false) {
        
        const [result] = await pool.execute(
            `INSERT INTO Owner (Username, Password)
             VALUES (?, ?);`, [username, password]
        );

        if (result.affectedRows > 0) {
            return true;
        }
    }

    return false;
}

/**
 * Gets the owner's password.
 * @param {string} username The owner's username.
 * @returns the owner's password, otherwise null;
 */
async function getPassword(username) {
    
    if (await ownerExists(username) === true) {
        
        const [owners] = await pool.query(
            `SELECT Password FROM Owner WHERE Username = ? LIMIT 1;`, [username]
        )

        if (owners.length === 1) {
            return owners[0].Password;
        }
    }

    return null;
}

/**
 * Updates owner's password.
 * @param {string} username Owner's username.
 * @param {*} password Owner's new password.
 * @returns true if password is updated, otherwise false.
 */
async function updatePassword(username, password) {
    
    if (await ownerExists(username) === true) {
        const [result] = await pool.execute(
            `UPDATE Owner SET Password = ? WHERE Username = ?;`, [password, username]);
        
        if(result.affectedRows > 0){
            return true;
        }
    }

    return false;
}

/**
 * Deletes an owner with the given username.
 * @param {string} username The username of the owner to be deleted.
 * @returns true if owner is deleted, otherwise false.
 */
async function deleteOwner(username) {
    
    if (await ownerExists(username) === true) {
        const [result] = await pool.execute(`DELETE FROM Owner WHERE Username = ?;`, [username]);
        if (result.affectedRows > 0) {
            return true;
        }
    }

    return false;
}

/**
 * Checks if a project with the given pair of project `id` and owner `username`
 * exists.
 * @param {string} projectName The project's name.
 * @returns true if the project exists, otherwise false.
 */
async function projectExists(projectName) {
    
    const [projects] = await pool.query(
        `SELECT *
         FROM Project
         WHERE Name = ?;`
        , [projectName]);
    
    return projects.length > 0;
}

/**
 * Gets the data for the given project.
 * @param {string} projectName The name of the project to be fetched.
 * @returns The project with the given name, or null if it does not exist.
 */
async function getProject(projectName) {
    
    if (await projectExists(projectName) === true) {
        const [project] = await pool.query(
            `SELECT * FROM Project WHERE Name = ? LIMIT 1;`, [projectName]
        );
        
        const proj = project[0];
        console.log(`Inner proj: ${proj.Name}`);

        return new Project(proj.Owner_Username, proj.Name, proj.Problem, proj.Solution, proj.Revenue_Impact, proj.Cost_Impact, proj.Time_Impact, proj.Icon_Location, proj.Video_Location);
    }
    else
        console.error("No project found!");

    return null;
}

/**
 * Gets a list of projects that the owner worked on.
 * @returns A list of projects that the owner worked on.
 */
async function getProjects() {
    
    const [projects] = await pool.query(`SELECT * FROM Project;`);
    if(projects.length > 0){
        return projects;
    }

    return [];
}

/**
 * Adds a project that is owned by the given owner.
 * @param {Project} project The project to be added.
 * @param {string} username The username of the project's owner.
 * @returns true if the project is added, otherwise false.
 */
async function addProject(project) {
    
    if (await ownerExists(project.ownerUsername) === true &&
        await projectExists(project.name) === false) {
        
        const [result] = await pool.execute(
            `INSERT INTO Project (Id, Owner_Username, Name, Problem, Solution, Revenue_Impact, Cost_Impact, Time_Impact, Icon_Location, Video_Location) VALUES (?,?,?,?,?,?,?,?,?,?);`
            , [0, project.ownerUsername, project.name, project.problem, project.solution, project.revenueImpact,
            project.costImpact, project.timeImpact, project.iconLocation, project.videoLocation
            ]);
        
        if (result.affectedRows > 0) {
            return true;
        }
        else {
            console.error("Failed to add the project!!");
        }
    
    }
    else {
        console.error("Failed: username MUST exist AND projectName MUST NOT exist.");
    }
    return false;
}

/**
 * Updates a project's data.
 * @param {Project} project The project to be updated.
 * @returns true if the project is updated, otherwise false.
 */
async function updateProject(project) {
    
    if (await projectExists(project.name) === true) {

        let isUpdated = false;
        const existingProj = await getProject(project.name);
        
        /*if (project.ownerUsername !== existingProj.ownerUsername) {
            existingProj.ownerUsername = project.ownerUsername;
            isUpdated = true;
        }*/

        if (!project.problem && project.problem !== existingProj.problem) {
            existingProj.problem = project.problem;
            isUpdated = true;
        }

        if (!project.solution && project.solution !== existingProj.solution) {
            existingProj.solution = project.solution;
            isUpdated = true;
        }

        if (!project.revenueImpact && project.revenueImpact !== existingProj.revenueImpact) {
            existingProj.revenueImpact = project.revenueImpact;
            isUpdated = true;
        }

        if (!project.costImpact && project.costImpact !== existingProj.costImpact) {
            existingProj.costImpact = project.costImpact;
            isUpdated = true;
        }

        if (!project.timeImpact && project.timeImpact !== existingProj.timeImpact) {
            existingProj.timeImpact = project.timeImpact;
            isUpdated = true;
        }

        if (project.iconLocation !== existingProj.iconLocation) {
            existingProj.iconLocation = project.iconLocation;
            isUpdated = true;
        }

        if (project.videoLocation !== existingProj.videoLocation) {
            existingProj.videoLocation = project.videoLocation;
            isUpdated = true;
        }

        console.log(`Icon location: ${project.iconLocation}`);
        console.log("IS UPDATED: " + isUpdated);

        if (isUpdated === true) {
            
            const [result] = await pool.execute(
                `UPDATE Project
                 SET Problem = ?, Solution = ?, Revenue_Impact = ?, Time_Impact = ?, Cost_Impact = ?, Icon_Location = ?, Video_Location = ?
                 WHERE Name = ?;`, [existingProj.problem, existingProj.solution, existingProj.revenueImpact, existingProj.timeImpact, existingProj.costImpact, existingProj.iconLocation, existingProj.videoLocation, existingProj.name]
            );

            if (result.affectedRows > 0) {                
                return true;
            }
            else {
                console.log("No update.");
            }
        }

    }

    return false;
}

/**
 * Deletes the project with the given name.
 * @param {string} name The name of the project to be deleted.
 * @returns true if the project is deleted, otherwise false.
 */
async function deleteProject(name) {
    
    if (await projectExists(name) === true) {
        
        const [result] = await pool.execute(
            `DELETE FROM Project WHERE Name = ?;`, [name]);
        
        if (result.affectedRows > 0) {
            return true;
        }
    }

    return false;
}

/**
 * Export the API.
 */
module.exports = {
    pool,
    getOwner,
    getPassword,
    updatePassword,
    addOwner,
    ownerExists,
    deleteOwner,
    projectExists,
    addProject,
    getProject,
    getProjects,
    updateProject,
    deleteProject
}