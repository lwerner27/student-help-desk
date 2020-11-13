const nodemailer = require("nodemailer");
const router = require("express").Router();

const htmlToText = require("nodemailer-html-to-text").htmlToText;

let transporter = nodemailer.createTransport({
    service: "Zoho",
    auth: {
        user: process.env.HELPDESK_EMAIL,
        pass: process.env.HELPDESK_EMAIL_PASSWORD,
    },
});

transporter.use("compile", htmlToText());

router.get("/", (req, res) => {
    res.render("tips", { pageTitle: "Tips" });
});

router.get("/request", (req, res) => {
    res.render("request-form", { pageTitle: "Help Request Form" });
});

router.get("/success", (req, res) => {
    res.render("success", { pageTitle: "Thank You!" });
});

router.post("/request", (req, res) => {
    const message = {
        from: `${process.env.HELPDESK_EMAIL}`,
        to: `${process.env[req.body.school]}`,
        subject: `New Help Request from: ${req.body.fullName}`,
        html: `<div class="container">
        <h2 class="ticket_title">New Help Request From: ${req.body.fullName}</h2>
        <hr>
        <div class="ticket">
          <p><strong>Full Name:</strong> ${req.body.fullName}</p>
          <p><strong>Parent's Email:</strong> ${req.body.email}</p>
          <p><strong>Parent's Phone Number:</strong> ${req.body.phoneNumber}</p>
          <p><strong>Student's Name:</strong> ${req.body.studentFullName}</p>
          <p><strong>School:</strong> ${req.body.school}</p>
          <p><strong>Issue Description:</strong> ${req.body.issueDescription}</p>
        </div>
      
        <style>
      
          .container {
            max-width: 1024px;
            padding: 50px;
            margin: auto;
          }
      
          .ticket_title {
            text-align: center
          }
        </style>
      
      </div>`,
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
