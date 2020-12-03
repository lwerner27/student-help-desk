require("dotenv").config();
const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

PORT = process.env.PORT || 8080;

const app = express();

app.engine(
    "handlebars",
    hbs({ layoutsDir: "views/layouts/", defaultLayout: "main" })
);
app.set("view engine", "handlebars");
app.set("views", "views");

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

const router = require("./router");
app.use("/", router);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});
