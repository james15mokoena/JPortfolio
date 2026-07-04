let projects = null;
let exProjects = [];

async function getProjects() {
    
    const response = await fetch("/projects");

    if (response.ok) {
        return await response.json();
    }
    else
        throw new Error("No projects found");
}

async function initProjects() {

    exProjects = await getProjects();

    if (exProjects !== null) {
        
        const projectsContainer = document.querySelector(".project-img");
        
        for (let i = 0; i < exProjects.length; ++i){

            const projectCnt = document.createElement("div");
            projectCnt.classList.add("proj-cnt");
            // add the project container to the projects container.
            projectsContainer.appendChild(projectCnt);

            // create the children of the project container
            const projectName = document.createElement("h4");
            projectName.classList.add("project-name");
            projectName.textContent = exProjects[i].name;
            projectCnt.appendChild(projectName);

            const link = document.createElement("a");
            link.href = "view-project";
            link.addEventListener("click", () => {
                
                sessionStorage.setItem("projectName", exProjects[i].name);
                sessionStorage.setItem("iconLocation", exProjects[i].iconLocation);
                sessionStorage.setItem("problem", exProjects[i].problem);
                sessionStorage.setItem("solution", exProjects[i].solution);
                sessionStorage.setItem("revenue", exProjects[i].revenueImpact);
                sessionStorage.setItem("time", exProjects[i].timeImpact);
                sessionStorage.setItem("cost", exProjects[i].costImpact);
            })
            projectCnt.appendChild(link);

            const icon = document.createElement("img");
            icon.classList.add("slide");
            icon.src = exProjects[i].iconLocation;
            icon.alt = exProjects[i].name;
            link.appendChild(icon);
        }

        projects = document.querySelectorAll(".project-img .proj-cnt");
        
    }
}

let currentIdx = 0;

/**
 * Responsible for showing a different project.
 * @param {number} index The index of the project to be displayed.
 */
function showProject(index) {
    
    //exProjects = await getProjects();

    // hide each project.
    projects.forEach(function (project) {
        project.style.display = "none";
    });

    // show the project whose index is `currentIdx`
    projects[currentIdx].style.display = "block";
}

async function initPage() {

    await initProjects();
    
    showProject(currentIdx);

    // every 3 seconds change the project.
    setInterval(function () {
        currentIdx = (currentIdx + 1) % projects.length;
        showProject(currentIdx);
    }, 10000);
}

initPage();

const backBtn = document.querySelector(".back-btn");
const nextBtn = document.querySelector(".next-btn");

/**
 * Change the displayed project.
 * @param {*} direction Indicates whether to slide backward or forward.
 */
function changeProject(direction) {
    
    if (direction === "backward") {
        if (currentIdx - 1 < 0) {
            currentIdx = projects.length - 1;
            showProject(currentIdx);
        }
        else {
            currentIdx = (currentIdx - 1) % projects.length;
            showProject(currentIdx);   
        }
    }
    else if (direction === "forward") {

        if (currentIdx + 1 >= projects.length) {
            currentIdx = 0;
            showProject(currentIdx);
        }
        else {
            currentIdx = (currentIdx + 1) % projects.length;
            showProject(currentIdx);   
        }
    }
}

backBtn.addEventListener("click", function () {
    changeProject("backward");
});

nextBtn.addEventListener("click", function () {
    changeProject("forward");
});