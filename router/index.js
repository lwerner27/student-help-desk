const nodemailer = require("nodemailer");
const router = require("express").Router();

let transporter = nodemailer.createTransport({
    service: "Zoho",
    auth: {
        user: process.env.HELPDESK_EMAIL,
        pass: process.env.HELPDESK_EMAIL_PASSWORD,
    },
});

router.get("/", (req, res) => {
    res.render("request-form", { pageTitle: "Help Request Form" });
});

router.get("/success", (req, res) => {
    res.render("success", { pageTitle: "Thank You!" });
});

router.post("/submit_form", (req, res) => {
    const message = {
        from: `${process.env.HELPDESK_EMAIL}`,
        to: `${process.env[req.body.school]}`,
        subject: `New Help Request from: ${req.body.fullName}`,
        text: req.body.issueDescription,
    };
    transporter.sendMail(message, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Email has been sent.");
            return res.status(200).send({ success: true, msg: "Success" });
        }
    });
});

module.exports = router;
