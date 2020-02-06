const inq = require('inquirer');
const questions = require('./lib/questions');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');


let employeeArr = [];

//Async Function for Adding Employees and creating classes
async function employeeCLI() {
    let employeeData = await inq.prompt(questions);
    let { name, email, employee, phone, github, school, another} = employeeData;
    let id = employeeArr.length + 1;
    
    if (employee === "Manager"){
        let manager = new Manager(name, id, email, phone);
        employeeArr.push(manager);

    } else if (employee === "Engineer") {
        let engineer = new Engineer(name, id, email, github);
        employeeArr.push(engineer);

    } else if (employee === "Intern"){
        let intern = new Intern(name, id, email, school);
        employeeArr.push(intern);
    }

    if(another){
        employeeCLI();
    } else {
        console.log(employeeArr);
        employeeArr.forEach(item => {
            if (item instanceof Manager) {
                console.log(item.getId());
                console.log(item.getName());
                console.log(item.getRole());
                console.log(item.getEmail());
                console.log(item.getOfficeNumber());
            }
        });
    }
}

//Kicking things off for testing
employeeCLI();
