const loginForm = document.querySelector(".login-form");

/**
 * Checks if a string value is not null and not undefined.
 * @param {string} strValue A string value;
 * @returns true if not null and not undefined, otherwise false.
 */
function isNotNullOrUndefined(strValue) {
    return strValue !== null && strValue !== undefined;
}

/**
 * Returns the values of the form input controls.
 * @returns 
 */
function getFormData() {
    
    const data = new FormData(loginForm);

    return Object.fromEntries(data.entries());
}

/**
 * Shows or hides the login status message.
 * @param {*} message The status message to display.
 * @param {*} display Indicates whether to display or hide the message.
 */
function showStatusMessage(message, display) {
    
    const status = document.querySelector(".login-status");
    status.style.display = display;
    status.style.color = "red";
    status.textContent = message;
}

document.querySelector(".login-btn").addEventListener("click", async () => {

    const loginData = getFormData();

    if (isNotNullOrUndefined(loginData.username) && loginData.username !== "" &&
        isNotNullOrUndefined(loginData.password) && loginData.password !== "") {
        
        const response = await fetch("/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            }
        );
    
        if (response.ok) {
            sessionStorage.setItem("selectedNavItem", "home");
            location = "/";
        }
        else {
            showStatusMessage("Failed", "block");
        }
    }
    else {
        showStatusMessage("Provide username and Password", "block");
    }
});