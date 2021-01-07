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

function TeamMember(name, id, github, email, title, add) {
    this.name = name;
    this.id = id;
    this.github = github;
    this.email = email;
    this.title = title;
    this.add = add;
}

function teamListBuild() {
  inquirer.prompt(employeeQuestions).then((data) => {
    // console.log(data.name);
    console.log(team.length)
    var newEmployee = new TeamMember(data.name, team.length + 1, data.github, data.email, data.title, data.add);
    console.log(newEmployee)

    if (data.add) {
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
        console.log(response.manager)
        if(response.teamConfirm) {
            teamListBuild();
        }
        
        teamPage(response.manager, response.office)
    })
}

function teamPage(name, officeNum) {
    const teamPageTemplate = `
    <!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="../style.css">
    <title>Hello, world!</title>
  </head>
  <body>
    <div class="jumbotron text-center">
        <h1>${name}'s Team</h1>
        <h2>Office Number: ${officeNum}<h2>
    </div>
    

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>
    `
    fs.writeFile(name + ".html",  teamPageTemplate, function(err) {
        if(err) {
            console.log(err)
        }
    })
}


managerInit();
// teamListBuild();
