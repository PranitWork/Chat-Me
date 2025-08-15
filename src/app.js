const cookieParser = require( "cookie-parser");
const express = require("express")


const indexRoute = require("./routes/index.routes");
const authRoute = require("./routes/auth.routes")

require("dotenv").config();


const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use("/", indexRoute);
app.use("/auth", authRoute);

module.exports = app;