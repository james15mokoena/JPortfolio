const navbarItems = document.querySelectorAll(".navbar .nav-item");
const dropItems = document.querySelectorAll(".dropdown-menu .drop-item");

window.onload = function () {

    if (!sessionStorage.getItem("selectedNavItem")) {
        sessionStorage.setItem("selectedNavItem", "home");
        location = "http://192.168.43.172:4000/";
    }
}

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