const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

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
        when: (input) => input.title === "Engineer"
    },
    {
        type: "input",
        name: "name",
        message: "Office number of new employee?",
        when: (input) => input.title === "Manager"
    },
    {
        type: "input",
        name: "name",
        message: "New employee school name?",
        when: (input) => input.title === "Intern"
    }

];
const team =[];

init();
function init() {
    prompt(userInput).then(input => {
        if(input.new === "no") {
            return;
        } else if (input.title === "Engineer") {
            let { id, name, email, github } = input;
            const employee = new Engineer(id, name, email, github);
            team.push(employee);
        } else if (input.title === "Manager") {
            let { id, name, email, officeNumber } = input;
            const employee = new Manager(id, name, email, officeNumber);
            team.push(employee);
        } else if (input.title === "Intern") {
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