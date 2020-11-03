const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("request-form", { pageTitle: "Help Request Form" });
});

router.get("/success", (req, res) => {
    res.render("success", { pageTitle: "Thank You!" });
});

router.post("/submit_form", (req, res) => {
    console.log(req.body);
    return res.status(200).send({ success: true, msg: "Success" });
});

module.exports = router;
