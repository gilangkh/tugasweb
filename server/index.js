/** @format */

const express = require("express");
const cors = require("cors");
const db = require("./modules/db");
const router = require("./routes/routes");
const cookieParser = require("cookie-parser");
const app = express();
const Router = require("./routes/routes");
const Middleware = require('./middleware/AuthToken')
app.use(express.json());
app.use(cors());
app.use(cookieParser(Middleware))
app.use(express.static("public"));
app.use("/", Router);
app.use(router);

const port = 3000;
app.listen(port, () => console.log("Port Back-End jalan di port 3000"));
