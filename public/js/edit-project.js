const editForm = document.querySelector(".edit-form");

/**
 * Gets the form's entries.
 * @returns the form's entries.
 */
function getFormEntries() {

    const formData = new FormData(editForm);
    return Object.fromEntries(formData.entries());
}

/**
 * When this button is clicked, the project's data must be fetched from the
 * database and displayed.
 */
document.querySelector(".get-data-btn").addEventListener("click", async () => {

    const form = getFormEntries();
    
    // send the request to fetch the project's data.
    const response = await fetch(`/edit-project/${encodeURIComponent(form.name)}`);

    const data = await response.json();

    // display the data
    document.querySelector("#inp-solution").value = data.solution;
    document.querySelector("#inp-problem").value = data.problem;
    document.querySelector("#inp-revenue").value = data.revenueImpact;
    document.querySelector("#inp-cost").value = data.costImpact;
    document.querySelector("#inp-time").value = data.timeImpact;
    document.querySelector("#inp-icon").value = data.iconLocation;
    document.querySelector("#inp-video").value = data.videoLocation;
});

/**
 * When this button if clicked, it sends a request to update a project's data.
 */
document.querySelector(".update-btn").addEventListener("click", async () => {

    const form = getFormEntries();

    const response = await fetch(`/edit-project/${encodeURIComponent(form.name)}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
    
    if (response.status === 200) {

        document.querySelector(".col-status").style.display = "block";
        const status = document.querySelector(".col-status .status");
        status.textContent = "Updated";
        status.style.color = "green";
    }
    else if(response.status === 404){
        document.querySelector(".col-status").style.display = "block";
        const status = document.querySelector(".col-status .status");
        status.textContent = "Failed!";
        status.style.color = "red";
    }    
    
});