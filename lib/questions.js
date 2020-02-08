module.exports = [
    {
        type: "input",
        message: "Enter Employee Name",
        name: "name",
        validate: function validateName(name) {
            return name !== '' || "A valid name must be entered";
        }
    },
    {
        type: "input",
        message: "Enter Email",
        name: "email",
        validate: function validateEmail(email) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(email)) {
                return (true)
            }
            return "A valid email must be entered"
        }
    },
    {
        type: "list",
        message: "Select Title",
        choices: ["Manager", "Engineer", "Intern"],
        name: "employee"
    },
    {
        type: "input",
        message: "Enter Manager Phone Number",
        name: "phone",
        validate: function validatePhone(phone) {
            let regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (phone.match(regex)) {
                return true;
            }
            else {
                return "Please enter a valid 10-digit phone number";
            }
        },
        when: ({ employee }) => {
            if (employee === "Manager") {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: "input",
        message: "Enter GitHub Username",
        name: "github",
        validate: function validateGit(github) {
            return github !== '' || "Must Enter Git Hub Profile or Write N/A"
        },
        when: ({ employee }) => {
            if (employee === "Engineer") {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: "input",
        message: "Enter Intern's School",
        name: "school",
        validate: function validateGit(school) {
            return school !== '' || "Must Enter a School Name"
        },
        when: ({ employee }) => {
            if (employee === "Intern") {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: "confirm",
        message: "Add Another Employee?",
        name: "another"
    }
]

