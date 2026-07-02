/**
 * This model represents a project and is mapped to the `Project`
 * table in the database.
 */
class Project{

    /**
     * Intialises the project with the given data.
     * @param {*} ownerUsername The username of the project's owner.
     * @param {*} name The name of the project.
     * @param {*} problem A description of the problem this solution is solving.
     * @param {*} solution A description of how this solution solves the problem.
     * @param {*} revenueImpact An explanation of how this solution impacts the business's revenue (if possible).
     * @param {*} costImpact An explanation of how this solution impacts the business's costs (if possible).
     * @param {*} timeImpact An explanation of how this solution impacts the business's time spent performing some task (if possible).
     * @param {*} iconLocation A path to the project's icon.
     * @param {*} videoLocation A path to the project video demonstration.
     */
    constructor(ownerUsername, name, problem, solution, revenueImpact, costImpact, timeImpact, iconLocation, videoLocation) {
        
        this.ownerUsername = ownerUsername;
        this.name = name;
        this.problem = problem;
        this.solution = solution;
        this.revenueImpact = revenueImpact;
        this.costImpact = costImpact;
        this.timeImpact = timeImpact;
        this.iconLocation = iconLocation;
        this.videoLocation = videoLocation;
    }

    toString() {
        return `\nOwner: ${this.ownerUsername}\nName: ${this.name}\nProblem: ${this.problem}\nSolution: ${this.solution}\nRevenue Impact: ${this.solution}\nCost Impact: ${this.costImpact}\nTime Impact: ${this.timeImpact}\nIcon Location: ${this.iconLocation}\nVideo Location: ${this.videoLocation}\n`;
    }
}

module.exports = Project;