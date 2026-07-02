// imports
const express = require("express");
const handlebars = require("express-handlebars");
const session = require("./config/session.js");
const { routes } = require("./routes.js");
const db = require("./config/database.js");
const Project = require("./models/project.js");

// create an instance of express-handlebars.
const hbars = handlebars.create({ defaultLayout: "main", partialsDir: "views/partials" });

// create the app
const app = express();
// register the handlebars engine with the app.
app.engine("handlebars", hbars.engine);
app.set("view engine", "handlebars");

// register middleware

// enable the serving of static files in the /public folder
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// enable the use of sessions
app.use(session);

// register core request handlers
routes.registerRequestHandlers(app);

app.listen(4000, function () {
    console.log(`JPortfolio is running on port: 4000...`);
});

async function testDb() {
    
    /*const owners = await db.getOwners();
    console.log(owners);

    const exists = await db.ownerExists("pjm_maz");
    console.log("Exists: " + exists);

    const projExits = await db.projectExists("SmartInventory");
    console.log("Project exists: " + projExits);

    const newProj = new Project(
        "jimmy", "Bubbly",`The manager wants to be notified when stock needs to be reorders and wants to be informed about the sales performance and inventory purchases of the business.`, 'This solution generates stock reports that informs the manager of items that need to be reordered and also sends him an email when a reorder is required. It also provides sales reports showing how the business is perform in terms revenue generation on a monthly bases and how products and categories are performing. Finally, it also generates reports on inventory monthly purchases and which products and categories does the business spent too much or too little on.', "It is expected that the business should increase sales by at least 50% within two months of usage.", 'It is expected that the business will now spent on inventory when its necessary to do so, rather than stocking blindly.', 'The need to physically count stock will now be relegated to the end of the business day.', '/img/ford1.jpg', '');
    const isAdded = await db.addProject(newProj);
    console.log(`Is project added: ${isAdded}`)

    /*const proj = await db.getProject("SmartInvento");

    if (proj instanceof Project) {
        console.log(proj);
    }
    
    const proj = await db.getProject("SmartInvento");
    proj.videoLocation = "http://youtube.com";
    proj.iconLocation = "/img/smart.jpg";
    const updatedProj = await db.updateProject(proj);
    console.log("Updated: " + updatedProj);

    const isDeleted = await db.deleteProject("SmartInvento");
    console.log(`Is deleted: ${isDeleted}`);

    const isOwnerAdded = await db.addOwner("jimmy", "10111");
    console.log(`Is owner added: ${isOwnerAdded}`);

    const pass = await db.getPassword("pjm_maz");
    console.log(pass);

    const projects = await db.getProjects();
    console.log(projects);

    const res = await db.deleteOwner("jimmy");
    console.log(res);

    const isUpdatedPassword = await db.updatePassword("pjm_maz", "pjm");
    console.log(isUpdatedPassword);*/

}

testDb();