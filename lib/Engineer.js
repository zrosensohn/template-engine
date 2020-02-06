const Employee = require('./Employee');
const fs = require('fs');

class Engineer extends Employee {

    constructor(name, id, email, github){

        super(name, id, email);
        this.github = github;
    
    }

    getRole() {
        return "Engineer";
    }

    getGithub() {
        return this.github;
    }

    makeCard() {
        let cardStr = fs.readFileSync("./templates/engineer.html", "utf-8");

        let engineerCard = cardStr.replace(/\$ROLE/gi, this.getRole())
                .replace(/\$NAME/gi, this.name)
                .replace(/\$EMAIL/gi, this.email)
                .replace(/\$GITHUB/gi, this.github)
                .replace(/\$ID/gi, this.id);
        
        return engineerCard;
    }

}

module.exports = Engineer;