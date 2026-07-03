const editForm = document.querySelector(".edit-form");

/**
 * Gets the form's input data.
 * @returns the form's data.
 */
function getFormData() {

    const formData = new FormData(editForm);
    return Object.fromEntries(formData.entries());
}

/**
 * Display a status message indicating whether an operation was successful or not.
 * @param {string} message The message to display.
 * @param {string} display Indicates whether the status message must appear or not.
 * @param {string} color The color of the message.
 */
function showStatus(message, display, color) {
    document.querySelector(".col-status").style.display = display;
    const status = document.querySelector(".col-status .status");
    status.textContent = message;
    status.style.color = color;
}

/**
 * When this button is clicked, the project's data must be fetched from the
 * database and displayed.
 */
document.querySelector(".get-data-btn").addEventListener("click", async () => {

    const form = getFormData();
    
    // send the request to fetch the project's data.
    const response = await fetch(`/edit-project/${encodeURIComponent(form.name)}`);

    if (response.status === 404)
        showStatus("Not Found", "block", "red");
    else if(response.status === 200){

        if (document.querySelector(".col-status").style.display === "block") {
            showStatus("", "none", "");
        }

        const data = await response.json();

        // display the data
        document.querySelector("#inp-solution").value = data.solution;
        document.querySelector("#inp-problem").value = data.problem;
        document.querySelector("#inp-revenue").value = data.revenueImpact;
        document.querySelector("#inp-cost").value = data.costImpact;
        document.querySelector("#inp-time").value = data.timeImpact;
        document.querySelector("#inp-icon").value = data.iconLocation;
        document.querySelector("#inp-video").value = data.videoLocation;   
    }
});

/**
 * When this button if clicked, it sends a request to update a project's data.
 */
document.querySelector(".update-btn").addEventListener("click", async () => {

    const form = getFormData();

    const response = await fetch(`/edit-project/${encodeURIComponent(form.name)}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
    
    if (response.status === 200)
        showStatus("Updated", "block", "green");
    else if(response.status === 404)
        showStatus("Failed", "block", "red");
});

/**
 * When clicked it sends a request to add a new project.
 */
document.querySelector(".add-btn").addEventListener("click", async () => {
    
    const project = getFormData();

    const response = await fetch(`/edit-project`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project)
        });
    
    if (response.status === 404)
        showStatus("Failed", "block", "red");
    else if(response.status === 200)
        showStatus("Added", "block", "green");
});

/**
 * When clicked it sends a request to delete a project.
 */
document.querySelector(".delete-btn").addEventListener("click", async () => {
   
    const project = getFormData();

    const response = await fetch(`/edit-project/${encodeURIComponent(project.name)}`,
        {
            method: "DELETE"
        });

    if (response.status === 404)
        showStatus("Failed", "block", "red");
    else if (response.status === 200)
        showStatus("Deleted", "block", "green");
});