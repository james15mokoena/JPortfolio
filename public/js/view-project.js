/**
 * Checks if a string value is not null and not undefined.
 * @param {string} strValue A string value;
 * @returns true if not null and not undefined, otherwise false.
 */
function isNotNullOrUndefined(strValue) {
    return strValue !== null && strValue !== undefined;
}

window.addEventListener("load", function () {

    if (isNotNullOrUndefined(sessionStorage.getItem("iconLocation"))) {
        
        // set the project icon
        const projectIcon = document.querySelector(".project-icon");
        projectIcon.setAttribute("src", sessionStorage.getItem("iconLocation"));
        projectIcon.setAttribute("alt", sessionStorage.getItem("projectName"));

        // set the problem description
        const problem = document.querySelector(".problem");
        problem.textContent = sessionStorage.getItem("problem");

        // set the solution description
        const solution = document.querySelector(".solution");
        solution.textContent = sessionStorage.getItem("solution");

        // set the revenue impact description
        const revenue = document.querySelector(".revenue");
        revenue.textContent = sessionStorage.getItem("revenue");

        // set the time impact description
        const time = document.querySelector(".time");
        time.textContent = sessionStorage.getItem("time");

        // set the cost impact description
        const cost = document.querySelector(".cost");
        cost.textContent = sessionStorage.getItem("cost");
    }
});