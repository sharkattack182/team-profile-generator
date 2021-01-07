const inquirer = require("inquirer");
const fs = require("fs");

inquirer.prompt([
    {
        type: "confirm",
        message: "would you like to add an employee?",
        name: "prompt"
    }
]).then(data => {
    let confirm = data.prompt
    console.log(confirm);
})