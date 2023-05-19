/** @format */

const express = require("express");
const cors = require("cors");
const db = require("./modules/db");
const Router = require("./routes/routes");
const router = require("./routes/routes");

const app = express();
app.use(express.json());
app.use(cors());

async function main() {
  let conection = db.connection;
}


const port = 3000
app.use(router);

app.listen(port, () => console.log("Port Back-End jalan di port 3000"));
