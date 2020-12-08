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
// router.get("/tickets", (req, res) => {
//     return Tickets.getTickets(req, res);
// });

// Route for displaying individual ticket
// router.get("/ticket/:id", (req, res) => {
//     return Tickets.getTicketById(req, res);
// });

router.post("/request", (req, res) => {
    return Tickets.submitTicket(req, res);
});

router.get("/login", (req, res) => {
    return res.render("login", { pageTitle: "Login" });
});

router.get("/register", (req, res) => {
    return Users.checkForUsers(req, res);
});

router.post("/register", (req, res) => {
    return User.createFirstUser(req, res);
});

module.exports = router;
