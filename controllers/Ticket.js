const Ticket = require("../models/Ticket");
const nodemailer = require("nodemailer");

const htmlToText = require("nodemailer-html-to-text").htmlToText;

let transporter = nodemailer.createTransport({
    service: "Zoho",
    auth: {
        user: process.env.HELPDESK_EMAIL,
        pass: process.env.HELPDESK_EMAIL_PASSWORD,
    },
});

transporter.use("compile", htmlToText());

module.exports = {
    // Function that handles the new ticket ticket submission and creation.
    submitTicket: (req, res) => {
        const message = {
            from: `${process.env.HELPDESK_EMAIL}`,
            to: `${process.env[req.body.school]}`,
            subject: `New Help Request from: ${req.body.fullName}`,
            html: `<div class="container">
            <h2 class="ticket_title">New Help Request From: ${req.body.fullName}</h2>
            <hr>
            <div class="ticket">
              <p><strong>Full Name:</strong> ${req.body.fullName}</p>
              <p><strong>Parent's Email:</strong> ${req.body.emailAddress}</p>
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

        // Saves ticket to database.
        const newTicket = new Ticket({
            fullName: req.body.fullName,
            email: req.body.emailAddress,
            phoneNumber: req.body.phoneNumber,
            studentFullName: req.body.studentFullName,
            school: req.body.school,
            issueDescription: req.body.issueDescription,
        });
        newTicket.save(function (err) {
            if (err) {
                // Reports the error if one exists.
                console.log("Error saving to database.");
                console.log(err);
                return res.status(500).send({
                    success: false,
                    msg: "Error saving to database.",
                });
            } else {
                console.log("Ticket saved to database.");
                // Sends email
                transporter.sendMail(message, (err) => {
                    if (err) {
                        console.log("Error sending email.");
                        console.log(err);
                        return res.status(500).send({
                            success: false,
                            msg: "Error sending email.",
                        });
                    } else {
                        console.log("Email has been sent.");
                        return res
                            .status(200)
                            .send({ success: true, msg: "Success" });
                    }
                });
            }
        });
    },
    // Function for getting information for all the tickets.
    getTickets: (req, res) => {
        Ticket.find({})
            // .select("-emailAddress -phoneNumber -__v")
            .lean()
            .then((data) => {
                return res.render("tickets", {
                    pageTitle: "Tickets",
                    tickets: data,
                });
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
    },
    getTicketById: (req, res) => {
        Ticket.findById(req.params.id)
            .select("-__v")
            .lean()
            .then((data) => {
                return res.render("ticket", {
                    pageTitle: "Ticket",
                    ticket: data,
                });
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
    },
};
