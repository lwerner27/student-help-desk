const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("request-form", { pageTitle: "Help Request Form" });
});

router.post("/submit_form", (req, res) => {
    console.log(req.body);
    return res.status(200).send({ success: true, msg: "Success" });
});

module.exports = router;
