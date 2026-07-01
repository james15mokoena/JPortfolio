
/**
 * This model represents the owner of the projects and is mapped
 * to the `Owner` table in the table.
 */
class Owner{

    /**
     * Initializes the owner's `username` and `password`.
     * @param {*} username The owner's username.
     * @param {*} password The owner's password.
     */
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    toString() { return `\nUsername: ${this.username}\nPassword: ${this.password}`; }
}

module.exports = Owner;