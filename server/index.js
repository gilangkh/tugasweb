/** @format */

const express = require("express");
const cors = require("cors");
const db = require("./modules/db");
const router = require("./routes/routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const path = require('path')



app.use(express.json());
app.use(cors());


const port = 3000;
app.use(router);

app.listen(port, () => console.log("Port Back-End jalan di port 3000"));
