require("dotenv").config();
const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
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

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    connectTimeoutMS: 300000,
};

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI, options);

app.use(
    session({
        secret: process.env.SESSION_SECRET || "test_secret",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

const router = require("./router");
app.use("/", router);

app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});
