/** @format */

const express = require("express");
const cors = require("cors");
const app = express();
const Router = require("./routes/routes");

const session = require('express-session')


app.use(express.json());
app.use(cors());
app.use(cors({
    origin: 'http://tugasweb.eastus2.cloudapp.azure.com:8000'
  }));
  
app.use(express.static("public"));
app.use(session({
    secret: 'gilang',
    resave: false,
    saveUninitialized: true,
  }));
app.use("/", Router);


const port = 3000;
app.listen(port, () => console.log("Port Back-End jalan di port 3000"));