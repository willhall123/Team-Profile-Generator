// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("inquirer");

class Intern extends Employee {
    constructor (id, name, email, school)
    {
        this.id = id;
       this.name = name;
       this.email = email;
       this.school = school;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getSchool() {
        return this.school;
    }
    getRole() {
        return "Intern";
    }
};

module.exports = Intern;