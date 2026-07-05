const navbarItems = document.querySelectorAll(".navbar .nav-item");
const dropItems = document.querySelectorAll(".dropdown-menu .drop-item");
const loginLnk = document.querySelector(".navbar .login");
const dropLoginLnk = document.querySelector(".dropdown-menu .login");
const projectLnk = document.querySelector(".navbar .project");
const dropProjectLnk = document.querySelector(".dropdown-menu .project");

/**
 * Checks if a string value is not null and not undefined.
 * @param {string} strValue A string value;
 * @returns true if not null and not undefined, otherwise false.
 */
function isNotNullOrUndefined(strValue) {
    return strValue !== null && strValue !== undefined;
}

window.addEventListener("load", async function () {

    const response = await fetch("/check-login");

    if (response.ok) {
        
        const data = await response.json();

        if (data.isLoggedIn === true) {

            loginLnk.textContent = "Logout";
            loginLnk.setAttribute("href", "/logout");

            dropLoginLnk.textContent = "Logout";
            dropLoginLnk.setAttribute("href", "/logout");

            // display the project link
            projectLnk.style.display = "flex";
            dropProjectLnk.style.display = "flex";
        }
        else {
            loginLnk.textContent = "Login";
            loginLnk.setAttribute("href", "/login");

            dropLoginLnk.textContent = "Login";
            dropLoginLnk.setAttribute("href", "/login");

            // hide the project link
            projectLnk.style.display = "none";
            dropProjectLnk.style.display = "none";
        }
    }

    if (!sessionStorage.getItem("selectedNavItem")) {
        sessionStorage.setItem("selectedNavItem", "home");
        location = "/";
    }
});

navbarItems.forEach(function (item) {

    // for the main navigation bar
    item.addEventListener("click", function () {
        item.style.backgroundColor = "white";
        sessionStorage.setItem("selectedNavItem", item.classList[1]);
    });
});

dropItems.forEach((item) => {
    
    // for the dropdown navigation bar
    item.addEventListener("click", function () {
        item.style.backgroundColor = "lightseagreen";
        sessionStorage.setItem("selectedNavItem", item.classList[1]);
    });
})

if (sessionStorage.getItem("selectedNavItem") === "home") {
    navbarItems[0].style.backgroundColor = "lightslategray";
    dropItems[0].style.backgroundColor = "lightslategray";
}
else if (sessionStorage.getItem("selectedNavItem") === "project") {
    navbarItems[1].style.backgroundColor = "lightslategray";
    dropItems[1].style.backgroundColor = "lightslategray";
}
else if (sessionStorage.getItem("selectedNavItem") === "about") {
    navbarItems[2].style.backgroundColor = "lightslategray";
    dropItems[2].style.backgroundColor = "lightslategray";
}
else if (sessionStorage.getItem("selectedNavItem") === "login") {
    navbarItems[3].style.backgroundColor = "lightslategray";
    dropItems[3].style.backgroundColor = "lightslategray";
}