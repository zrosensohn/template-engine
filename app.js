const inq = require('inquirer');
let employeeArr = [];

//Async Function for Adding Employees and creating classes
async function employeeCLI() {
    let employeeData = await employeeInput();
    let employee = employeeData.employee;
    
    if (employee === "Manager"){
        let managerPhone = await managerInput();
        employeeData.phone = managerPhone.phone;
        employeeArr.push(employeeData);
        //create manager class here
        ///////////////////////////
        addEmployee();

    } else if (employee === "Engineer") {
        let gitHub = await engineerInput();
        employeeData.github = gitHub.github;
        employeeArr.push(employeeData);
        //create Engineer class here
        ///////////////////////////
        addEmployee();

    } else if (employee === "Intern"){
        let intern = await internInput();
        employeeData.school = intern.school;
        employeeArr.push(employeeData);
        //create Intern class here
        ///////////////////////////
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