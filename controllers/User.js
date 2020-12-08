const Users = require("../models/User");

module.exports = {
    checkForUsers: (req, res) => {
        Users.find().then((users) => {
            if (users.length > 0) {
                return res.redirect("/login");
            } else {
                return res.render("login", {
                    pageTitle: "Register",
                    registration: true,
                });
            }
        });
    },
};
