const inquirer = require("inquirer");
const fs = require("fs");

const team = [];

const managerInput = inquirer
  .prompt([
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
        name: "email",  
    }
  ])
  .then((data) => {
    console.log(data);
  });
// inquirer.prompt([
//     {
//         type: "confirm",
//         message: "would you like to add an employee?",
//         name: "prompt"
//     }
// ]).then(data => {
//     let confirm = data.prompt
//     console.log(confirm);

//     if(confirm) {
//         inquirer.prompt([
//             {
//                 type: "input",
//                 message: "What is the employees name?",
//                 name: "name"
//             },
//             {
//                 type: "number",
//                 message: "What is the employees ID?",
//                 name: "id"
//             },
//             {
//                 type: "input",
//                 message: "What is the employees GitHub?",
//                 name: "github"
//             },
//             {
//                 type: "input",
//                 message: "What is the employees email?",
//                 name: "email"
//             },
//             {
//                 type: "list",
//                 message: "What is the employees title?",
//                 choices: ["Engineer", "Intern"],
//                 name: "title"
//             },
//         ]).then(data => {
//             console.log(data);
//         })
//     }
// })


