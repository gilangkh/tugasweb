/** @format */

const express = require("express");
const cors = require("cors");
const db = require("./modules/db");
const router = require("./routes/routes");
const cookieParser = require('cookie-parser')
const app = express();
const Router = require("./routes/routes");
const Middleware = require('./middleware/AuthToken')
const authToken = Middleware.authenticateJWT
const session = require('express-session')
app.use(express.json());
app.use(cors());
app.use(cors({
    origin: 'http://localhost:8000'
  }));
  
app.use(express.static("public"));
app.use(cookieParser("sadsad"))
app.use(session({
    secret: 'gilang',
    resave: false,
    saveUninitialized: true,
  }));
app.use("/", Router);


const port = 3000;
app.listen(port, () => console.log("Port Back-End jalan di port 3000"));