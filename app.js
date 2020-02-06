const inq = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');


let employeeArr = [];

//Async Function for Adding Employees and creating classes
async function employeeCLI() {
    let employeeData = await employeeInput();
    let employee = employeeData.employee;
    let name = employeeData.name;
    let id = employeeData.id;
    let email = employeeData.email;
    
    if (employee === "Manager"){
        let managerPhone = await managerInput();
        let manager = new Manager(name, id, email, managerPhone.phone);
        employeeArr.push(manager);
        addEmployee();

    } else if (employee === "Engineer") {
        let gitHub = await engineerInput();
        let engineer = new Engineer(name, id, email, gitHub.github);
        employeeArr.push(engineer);
        addEmployee();

    } else if (employee === "Intern"){
        let school = await internInput();
        let intern = new Intern(name, id, email, school.school);
        employeeArr.push(intern);
        addEmployee();
    }
}

//Function for baseline data for all employee types
function employeeInput() {
    return inq.prompt([
        {
            type: "input",
            message: "Enter Employee Name",
            name: "name"
        },
        {
            type: "input",
            message: "Enter Employee ID",
            name: "id"
        },
        {
            type: "input",
            message: "Enter Email",
            name: "email"
        },
        {
            type: "list",
            message: "Select Title",
            choices: ["Manager", "Engineer", "Intern"],
            name: "employee"
        }
    ]);
}

//function for managaer specific data
function managerInput() {
    return inq.prompt([
        {
            type: "input",
            message: "Enter Manager Phone Number",
            name: "phone"
        }
    ]);
}

//function for Engineer specific data
function engineerInput() {
    return inq.prompt([
        {
            type: "input",
            message: "Enter GitHub Username",
            name: "github"
        }
    ]);
}

//function for Intern specific data
function internInput() {
    return inq.prompt([
        {
            type: "input",
            message: "Enter Intern's School",
            name: "school"
        }
    ]);
}

//Function to continue CLI for adding another epmployee
function addEmployee() {
    inq.prompt([
        {
            type: "list",
            message: "Add Another Employee?",
            choices: ["Yes", "No"],
            name: "continue"
        }
    ]).then(response => {
        switch(response.continue){
            case "Yes":
                employeeCLI();
                break;
            default:
                console.log(employeeArr);
                break;
        }
    });
}

//Kicking things off for testing
employeeCLI();
