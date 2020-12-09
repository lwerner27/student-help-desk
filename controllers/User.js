const User = require("../models/User");
const bcrypt = require("bcrypt");

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

    createUser: (req, res) => {
        let newUser = new User({
            fullName: req.body.fullName,
            email: req.body.email.toLowerCase(),
            password: req.body.password,
            role: req.body.role,
        });

        newUser.save((err) => {
            if (err) {
                console.log("Error saving user to database.");
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

    loginUser: (req, res) => {
        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) console.log(err);

            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err) console.log(err);

                if (isMatch) {
                    req.session.user = user;
                    req.session.loggedIn = true;
                    return res.status(200).send({
                        success: true,
                        msg: "You have succesfully logged in.",
                    });
                } else {
                    return res.status(401).send({
                        success: false,
                        msg: "Email or password is incorrect.",
                    });
                }
            });
        });
    },
};
