const Employee = require('./Employee');
const fs = require('fs');

class Intern extends Employee {

    constructor(name, id, email, school) {

        super(name, id, email);
        this.school = school;

    }
    
    getRole() {
        return "Intern";
    }

    getSchool() {
        return this.school;
    }

    makeCard() {
        let cardStr = fs.readFileSync("./templates/intern.html", "utf-8");

        let internCard = cardStr.replace(/\$ROLE/gi, this.getRole())
                .replace(/\$NAME/gi, this.name)
                .replace(/\$EMAIL/gi, this.email)
                .replace(/\$SCHOOL/gi, this.school)
                .replace(/\$ID/gi, this.id);
        
        return internCard;
    }

}

module.exports = Intern;