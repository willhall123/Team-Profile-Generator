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
        name: "role",
        message: "Role of new employee?",
        choices: ["Engineer", "Manager", "Intern"],
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
        name: "id",
        message: "ID for new employee?",
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
        name: "officeNumber",
        message: "Office number of new employee?",
        when: (input) => input.role === "Manager"
    },
    {
        type: "input",
        name: "school",
        message: "New employee school name?",
        when: (input) => input.role === "Intern"
    }

];
const team =[];

init();
function init() {
    inquirer.prompt(userInput).then(input => {
        if(input.new === "no") {
            const html = render(team);
            fs.writeFile(outputPath, html, function(err) {
                if(err) throw err;
            });
            return;
        } else if (input.role === "Engineer") {
            let { name, id, email, github } = input;
            const engineer = new Engineer(name, id, email, github);
            team.push(engineer);
        } else if (input.role === "Manager") {
            let { name, id, email, officeNumber } = input;
            const manager = new Manager(name, id, email, officeNumber);
            team.push(manager);
        } else if (input.role === "Intern") {
            let { name, id, email, school } = input;
            const intern = new Intern(name, id, email, school);
            team.push(intern);
        }
        init();
    });
};