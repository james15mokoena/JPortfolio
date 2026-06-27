# Project: JPortfolio

## Use Cases

1. Log in
2. Log out
3. Add new project.
4. Update project.
5. View projects.
6. View a project.
7. Delete project.
8. Add user account.
9. Update user account.
10. Delete user account.
11. View user account.
12. View about me.

---

## User Scenarios

```
Use Case: Log in
Input: Username and password.
Output: The home page with more options than the default.
1. Admin clicks on the login link to go to the login page.
2. System displays the login page.
3. Admin enter username and password.
4. Admin clicks the login button.
5. System validates the username and password.
6. System redirects admin to the home page and shows more options.

Extensions

5a. Form input invalid
    1. System informs the admin that form input is invalid.
    2. Admin corrects the input or cancels.
```

```
Use Case: Add new project
Input: Project's data that must be stored.
Output: A message indicating that the project is added or not.
1. Admin clicks on the edit project link to go to the edit project page.
2. System displays the edit project page.
3. Admin enters project data.
4. Admin clicks on the add project button.
5. System checks if project data satisfies all the conditions.
6. System adds project data.
7. System informs admin that project data has been added.

Extensions

5a. Form input invalid
    1. System informs admin that form input is invalid.
    2. Admin corrects project data or cancels.
```

```
Use Case: Update project
Input: Project's data that must be updated.
Output: A message indicating that the project is updated or not.
1. Admin clicks on the edit project link to go to the edit project page.
2. System displays the edit project page.
3. Admin enters the project's ID / name.
4. Admin clicks on the get data button to fetch project's existing data.
5. System displays the project's data.
6. Admin updates project's data.
7. Admin clicks on the update project button.
8. System checks if project data satisfies all the conditions.
9. System updates project data.
10. System informs admin that project data has been updated.

Extensions

5a. Form input invalid
    1. System informs admin that form input is invalid.
    2. Admin corrects project data or cancels.
```

```
Use Case: View projects.
Input: None
Output: Existing projects.
1. User visits the website's home page.
2. System fetches existing projects.
3. System displays the projects.

Extensions

2a. No projects found
    1. System informs the user that no projects were found.
```

```
Use Case: View a project.
Input: Select a project to view.
Output: Display the project's necessary data, screenshots or video presentation.
1. User visits the website's home page.
2. System fetches existing projects.
3. System displays the projects.
4. User selects a project to view.
5. System displays the view project page.

Extensions

2a. No projects found
    1. System informs the user that no projects were found.
```

```
Use Case: View about me.
Input: None
Output: Display an about me page providing information about me.
1. User visits the website's about me page.
2. System fetches information about me.
3. System displays the about me page.
```