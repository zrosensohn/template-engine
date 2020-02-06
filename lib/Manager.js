const Employee = require('./Employee');
const fs = require('fs');

class Manger extends Employee {
    
    constructor(name, id, email, officeNumber) {

        super(name, id, email);
        this.officeNumber = officeNumber; 
        
    }

    getRole() {
        return "Manager";
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    makeCard() {
        let cardStr = fs.readFileSync("./templates/manager.html", "utf-8");

        let managerCard = cardStr.replace(/\$ROLE/gi, this.getRole())
                .replace(/\$NAME/gi, this.name)
                .replace(/\$EMAIL/gi, this.email)
                .replace(/\$PHONE/gi, this.officeNumber)
                .replace(/\$ID/gi, this.id);
        
        return managerCard;
    }

}

module.exports = Manger;