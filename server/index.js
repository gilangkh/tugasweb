/** @format */

const express = require("express");
const cors = require("cors");
const db = require("./modules/db");
const router = require("./routes/routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cors());

async function main() {
  let conection = db.connection;
}

const port = 3000;
app.use(router);

app.listen(port, () => console.log("Port Back-End jalan di port 3000"));
