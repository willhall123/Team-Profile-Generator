// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const { identifier } = require("@babel/types");
const Employee = require("./Employee");

class Manager extends Employee {
    constructor (id, name, email, officeNumber)
    {
        this.id = id;
       this.name = name;
       this.email = email;
       this.officeNumber = officeNumber;
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
    getOfficeNumber() {
        return this.officeNumber;
    }
    getTitle() {
        return "Manager";
    }
};

module.exports = Manager;