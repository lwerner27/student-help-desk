const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    fullName: "string",
    email: "string",
    phoneNumber: "string",
    studentFullName: "string",
    school: "string",
    issueDescription: "string",
    status: {
        type: String,
        default: "open",
    },
    dateOpenned: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("Ticket", schema);

module.exports = Ticket;
