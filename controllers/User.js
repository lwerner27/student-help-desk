const User = require("../models/User");

module.exports = {
    checkForUsers: (req, res) => {
        User.find().then((users) => {
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
    createFirstUser: (req, res) => {
        let newUser = new User({
            email: req.body.email,
            password: req.body.password,
            fullName: req.body.fullName,
            role: "admin",
        });

        newUser.save((err) => {
            if (err) {
                // Reports the error if one exists.
                console.log("Error saving to database.");
                console.log(err);
                return res.status(500).send({
                    success: false,
                    msg: "Error registering new user try again later.",
                });
            } else {
                console.log("New user has been added to the database.");
                return res.status(200).send({ success: true, msg: "Success" });
            }
        });
    },
};
