const projects = document.querySelectorAll(".project-img .proj-cnt");

let currentIdx = 0;

/**
 * Responsible for showing a different project.
 * @param {*} index The index of the project to be displayed.
 */
function showProject(index) {
    
    // hide each project.
    projects.forEach(function (project) {
        project.style.display = "none";
    });

    // show the project whose index is `currentIdx`
    projects[currentIdx].style.display = "block";
}

showProject(currentIdx);

// every 3 seconds change the project.
setInterval(function () {
    currentIdx = (currentIdx + 1) % projects.length;
    showProject(currentIdx);
}, 10000);

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

        if (currentIdx + 1 > projects.length) {
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