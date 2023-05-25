/** @format */

const express = require("express");
const cors = require("cors");
const router = require("./routes/routes");
const cookieParser = require("cookie-parser")

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser);


const port = 3000;
app.use(router);

app.listen(port, () => console.log("Port Back-End jalan di port 3000"));
