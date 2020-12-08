const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    fullName: "string",
    email: "string",
    password: "string",
    role: "string",
});

const User = mongoose.model("User", schema);

module.exports = User;
