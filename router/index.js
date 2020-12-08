const router = require("express").Router();
const { Tickets, Users } = require("../controllers");
const User = require("../controllers/User");

router.get("/", (req, res) => {
    res.render("tips", { pageTitle: "Tips" });
});

router.get("/request", (req, res) => {
    res.render("request-form", {
        pageTitle: "Help Request Form",
        requestPage: true,
    });
});

router.get("/success", (req, res) => {
    res.render("success", { pageTitle: "Thank You!" });
});

router.get("/sorry", (req, res) => {
    res.render("sorry", { pageTitle: "Sorry!" });
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

router.post("/request", (req, res) => {
    return Tickets.submitTicket(req, res);
});

router.get("/login", (req, res) => {
    return res.render("login", { pageTitle: "Login", loginPage: true });
});

router.post("/login", (req, res) => {
    return Users.loginUser(req, res);
});

router.get("/register", (req, res) => {
    return Users.checkForUsers(req, res);
});

router.post("/register", (req, res) => {
    return User.createFirstUser(req, res);
});

module.exports = router;
