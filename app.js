const inq = require('inquirer');
const fs = require('fs');
const http = require('http');
const questions = require('./lib/questions');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const PORT = 8080;
let employeeArr = [];
let managerCards = '';
let engineerCards = '';
let internCards = '';

//Async Function for Adding Employees and creating classes
async function employeeCLI() {

    let employeeData = await inq.prompt(questions);
    let { name, email, employee, phone, github, school, another} = employeeData;
    let id = employeeArr.length + 1;
    
    if (employee === "Manager"){
        let manager = new Manager(name, id, email, phone);
        employeeArr.push(manager);
        managerCards += manager.makeCard();

    } else if (employee === "Engineer") {
        let engineer = new Engineer(name, id, email, github);
        employeeArr.push(engineer);
        engineerCards += engineer.makeCard();

    } else if (employee === "Intern"){
        let intern = new Intern(name, id, email, school);
        employeeArr.push(intern);
        internCards += intern.makeCard();
    }

    if(another){
        employeeCLI();

    } else {
        //FUNCTION TO RENER HTML
        let mainHTML = fs.readFileSync("./templates/main.html", "utf-8");
        let indexHTML = mainHTML.replace(/\$MANAGERS/gi, managerCards)
            .replace(/\$ENGINEERS/gi, engineerCards)
            .replace(/\$INTERNS/gi, internCards);
        
        fs.writeFileSync("./output/index.html", indexHTML);

        const server = http.createServer(handleRequest);
        server.listen(PORT, function() {
            console.log("Listening of port: " + PORT);
        })

    }
}

function renderHTML (res) {
    fs.readFile('./output/index.html', (err, data) => {
        if (err) throw err;
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
        res.end();
    })
}

function handleRequest(req, res) {
    let path = req.url

    switch(path) {
        case "/":
            return renderHTML(res);
        
        default:
            return res.end("404 page not found");
    }
}

//Kicking things off for testing
employeeCLI();
