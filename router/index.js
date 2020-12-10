const router = require("express").Router();
const { Tickets, Users } = require("../controllers");
const User = require("../controllers/User");

router.get("/", (req, res) => {
    res.render("tips", { pageTitle: "Tips", loggedIn: req.session.loggedIn });
});

router.get("/request", (req, res) => {
    res.render("request-form", {
        pageTitle: "Help Request Form",
        requestPage: true,
        loggedIn: req.session.loggedIn,
    });
});

router.get("/success", (req, res) => {
    res.render("success", {
        pageTitle: "Thank You!",
        loggedIn: req.session.loggedIn,
    });
});

router.get("/sorry", (req, res) => {
    res.render("sorry", {
        pageTitle: "Sorry!",
        loggedIn: req.session.loggedIn,
    });
});

// Route for displaying all the tickets
router.get("/tickets", (req, res) => {
    if (req.session.user !== undefined) {
        return Tickets.getTickets(req, res);
    } else {
        return res.redirect("/login");
    }
});

// Route for displaying individual ticket
router.get("/ticket/:id", (req, res) => {
    if (req.session.user !== undefined) {
        return Tickets.getTicketById(req, res);
    } else {
        return res.redirect("/login");
    }
});

router.put("/ticket/status", (req, res) => {
    if (req.session.user !== undefined) {
        return Tickets.updateStatus(req, res);
    } else {
        res.status(401).send({
            success: false,
            msg: "You are not authorized to access this route.",
        });
    }
});

router.post("/request", (req, res) => {
    return Tickets.submitTicket(req, res);
});

router.get("/login", (req, res) => {
    return res.render("login", { pageTitle: "Login", loginPage: true });
});

router.post("/login", (req, res) => {
    return Users.loginUser(req, res);
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    return res.redirect("/login");
});

router.get("/register", (req, res) => {
    return Users.checkForUsers(req, res);
});

router.post("/register", (req, res) => {
    return User.createFirstUser(req, res);
});

router.get("/add/user", (req, res) => {
    if (req.session.user !== undefined && req.session.user.role === "Admin") {
        return res.render("add-user", {
            pageTitle: "Add User",
            addUser: true,
            loggedIn: req.session.loggedIn,
        });
    } else if (
        req.session.user !== undefined &&
        req.session.user.role === "Tech"
    ) {
        return res.redirect("/tickets");
    } else {
        return res.redirect("/login");
    }
});

router.post("/add/user", (req, res) => {
    if (req.session.user !== undefined && req.session.user.role === "Admin") {
        return User.createUser(req, res);
    } else {
        return res.status(401).send({
            success: false,
            msg: "You are unauthorized to use this route.",
        });
    }
});

module.exports = router;
