// TODO: Write code to define and export the Employee class
const { prompt } = require("inquirer");

class Employee {
    constructor(id, name, email) 
    {
       this.id = id;
       this.name = name;
       this.email = email;
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
    getTitle() {
        return "Employee";
    }
};

module.exports = Employee;