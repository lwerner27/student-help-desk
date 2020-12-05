const router = require("express").Router();
const { Tickets } = require("../controllers");

router.get("/", (req, res) => {
    res.render("tips", { pageTitle: "Tips" });
});

router.get("/request", (req, res) => {
    res.render("request-form", { pageTitle: "Help Request Form" });
});

router.get("/success", (req, res) => {
    res.render("success", { pageTitle: "Thank You!" });
});

router.get("/sorry", (req, res) => {
    res.render("sorry", { pageTitle: "Sorry!" });
});

router.get("/tickets", (req, res) => {
    return Tickets.getTickets(req, res);
});

router.get("/ticket/:id", (req, res) => {
    return Tickets.getTicketById(req, res);
});

router.post("/request", (req, res) => {
    return Tickets.submitTicket(req, res);
});

module.exports = router;
