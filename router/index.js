const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("request-form", { pageTitle: "Help Request Form" });
});

module.exports = router;
