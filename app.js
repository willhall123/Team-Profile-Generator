const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const userInput = [
    {
        type: "list",
        name: "new",
        message: "Add new employee?",
        choices: ["yes", "no"],
        default: "no"
    },
    {
        type: "list",
        name: "title",
        message: "Title of new employee?",
        choices: ["Engineer", "Manager", "Intern"],
        default: "Intern",
        when: (input) => input.new === "yes"
    },
    {
        type: "input",
        name: "id",
        message: "ID for new employee?",
        when: (input) => input.new === "yes"
    },
    {
        type: "input",
        name: "name",
        message: "Name of new employee?",
        when: (input) => input.new === "yes"
    },
    {
        type: "input",
        name: "email",
        message: "Email address for new employee?",
        when: (input) => input.new === "yes"
    },
    {
        type: "input",
        name: "github",
        message: "Github username of new employee?",
        when: (input) => input.role === "Engineer"
    },
    {
        type: "input",
        name: "name",
        message: "Office number of new employee?",
        when: (input) => input.role === "Manager"
    },
    {
        type: "input",
        name: "name",
        message: "New employee school name?",
        when: (input) => input.role === "Intern"
    }

];
const team =[];

init();
function init() {
    prompt(userInput).then(input => {
        if(input.new === "no") {
            return;
        } else if (input.role === "Engineer") {
            let { id, name, email, github } = input;
            const employee = new Engineer(id, name, email, github);
            team.push(employee);
        } else if (input.role === "Manager") {
            let { id, name, email, officeNumber } = input;
            const employee = new Manager(id, name, email, officeNumber);
            team.push(employee);
        } else if (input.role === "Intern") {
            let { id, name, email, school } = input;
            const employee = new Intern(id, name, email, school);
            team.push(employee);
        }
        init();
    }).then(() => {
        fs.writeFile("index.html", render(team), function(err) {
            if(err) throw err;
        });
    });
}