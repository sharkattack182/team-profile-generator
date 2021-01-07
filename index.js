const inquirer = require("inquirer");
const fs = require("fs");

const team = [];

const managerQuestions = [
  {
    type: "input",
    message: "Who is the manager of this team?",
    name: "manager",
  },
  {
    type: "input",
    message: "What is the managers email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is the managers office number?",
    name: "office",
  },
  {
    type: "confirm",
    message: "Do you have any team members?",
    name: "teamConfirm",
  },
];

const employeeQuestions = [
  {
    type: "input",
    message: "What is the employees name?",
    name: "name",
  },
  {
    type: "number",
    message: "What is the employees ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the employees GitHub?",
    name: "github",
  },
  {
    type: "input",
    message: "What is the employees email?",
    name: "email",
  },
  {
    type: "list",
    message: "What is the employees title?",
    choices: ["Engineer", "Intern"],
    name: "title",
  },
  {
    type: "confirm",
    message: "Would you like to add another employee?",
    name: "add",
  },
];

function teamListBuild() {
  inquirer.prompt(employeeQuestions).then((data) => {
    console.log(data);
    if (data.add === true) {
      team.push(data);
      teamListBuild();
    } else {
      console.log(team);
    }
  });
}

function managerInit() {
    inquirer.prompt(managerQuestions).then(response => {
        console.log(response)
    })
}

managerInit();
// teamListBuild();
