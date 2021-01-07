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
  this.name = name.trim();
  this.id = id;
  this.github = github.trim();
  this.email = email.trim();
  this.title = title.trim();
  this.add = add;
}

function teamListBuild(mgrName, officeNumber, managerInfo) {
  // console.log("NAme: " + mgrName,"Office Number: " + officeNumber, "Manager: " + managerInfo)
  inquirer.prompt(employeeQuestions).then((data) => {
    var newEmployee = new TeamMember(
      data.name,
      team.length + 1,
      data.github,
      data.email,
      data.title,
      data.add
    );
    // console.log(newEmployee);

    if (data.add) {
      team.push(newEmployee);
    //   console.log(team + " processing...");
      teamListBuild();
    } else {
      team.push(newEmployee);
      const arrays = sortArr(team);
      const engineer = arrays[0];
      const intern = arrays[1];
      console.log(engineer[0])
      teamPage(mgrName, officeNumber, managerInfo, engineer[0], intern[0])
    //   console.log(team + " finsished");
    }
  });

}

function sortArr(team) {
    let engList = [];
    let intList = [];
    for (member of team) {
        // console.log(member);
        if (member.title === "Engineer") {
          let card = makeEngCard(
            member.name,
            member.id,
            member.github,
            member.email,
            member.title
          );
          engList.push(card);
        } else if (member.title === "Intern") {
          let card = makeIntCard(
            member.name,
            member.id,
            member.github,
            member.email,
            member.title
          );
        
          intList.push(card);
        }
    }

      return [engList, intList]
}

function managerInit() {
  inquirer.prompt(managerQuestions).then((response) => {
    // console.log(response);
    // console.log(response.manager);
    if (response.teamConfirm) {
      var mgrCard = makeMgrCard(
        response.manager,
        response.email,
        response.office
      );
      //   console.log(response.manager, response.office, mgrCard)
      teamListBuild(response.manager, response.office, mgrCard);
    } else if (response.teamConfirm === false) {
      var mgrCard = makeMgrCard(
      response.manager,
      response.email,
      response.office
    );
    teamPage(response.manager, response.office, mgrCard);  
    }
  });
}

function teamPage(name, officeNum, mgrCard, engineers, interns) {
    // console.log(name, officeNum, mgrCard, engineers, interns)
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
      <div class="container">
          <div class="row">
              <h2>Managers:</h2>
          </div>
          <div class="row">
              ${mgrCard}
          </div>
          <div class="row">
              <h2>Engineers:</h2>
          </div>
          <div class="row">
              ${engineers}
          </div>
          <div class="row">
              <h2>Interns:</h2>
          </div>
          <div class="row">
              ${interns}
          </div>
      </div>
      <!-- Optional JavaScript -->
      <!-- jQuery first, then Popper.js, then Bootstrap JS -->
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    </body>
  </html>
      `;
    fs.writeFile(name + ".html", teamPageTemplate, function (err) {
      if (err) {
        console.log(err);
      }
    });
}

const makeMgrCard = (manager, email, office) => {
  let templateCard = `<div class="col-lg-3"><div class="card text-white bg-danger mb-3" style="max-width: 18rem;"><div class="card-header"><h4>${manager}</h4></div><div class="card-body"><h5 class="card-title">Office: ${office}</h5><h4>Email: ${email}</h4></div></div></div>`;

  //   console.log(templateCard);
  return templateCard;
};

const makeEngCard = (name, id, github, email, title) => {
  let templateCard = `<div class="col-lg-3"><div class="card text-white bg-danger mb-3" style="max-width: 18rem;"><div class="card-header"><h4>${name}</h4></div><div class="card-body"><h5 class="card-title">Title: ${title}</h5><h4>ID: ${id}</h4><h4>Email: ${email}</h4><h4>GitHub: ${github}</h4></div></div></div>`;

  return templateCard;
};

const makeIntCard = (name, id, github, email, title) => {
  let templateCard = `<div class="col-lg-3"><div class="card text-light bg-info mb-3" style="max-width: 18rem;"><div class="card-header"><h4>${name}</h4></div><div class="card-body"><h5 class="card-title">Title: ${title}</h5><h4>ID: ${id}</h4><h4>Email: ${email}</h4><h4>GitHub: ${github}</h4></div></div></div>`;

  return templateCard;
};

managerInit();
// teamListBuild();
