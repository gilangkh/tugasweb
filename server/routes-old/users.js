/** @format */

var express = require("express");
var router = express.Router();
var db = require("../modules/db");
const bodyParser = require("body-parser");
var { User, login } = require("../models/users");
const { response } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.set("view engine", "ejs");
router.use(bodyParser.json());

router.get("/", (req, res, next) => {
  let connection = db.connection;

  let sql = "SELECT user_id, username, email, active FROM users";
  connection.query(sql, (err, rows, fields) => {
    if (err) throw err;

    res.render("userIndex", {
      data: rows,
      title: "User|List",
      layout: "./layout/main-layout",
    });
  });
});
router.get("/create", (req, res) => {
  res.render("register", {
    title: "User | Register",
    layout: false,
  });
});
router.post("/create", async (req, res, next) => {
  try {
    let user_id = req.body.user_id;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let active = req.body.active;
    let sign_img = req.body.sign_img;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      user_id: user_id,
      username: username,
      email: email,
      password: hashedPassword,
      active: active,
      sign_img: sign_img,
    });

    let response = {
      message: "Data berhasil ditambahkan",
      data: newUser,
    };

    return res.status(201).json(response);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Gagal menambahkan data ke database." });
  }
});

router.post("/:user_id/edit", (req, res, next) => {
  let connection = db.connection;

  let user_id = req.params.user_id;

  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let sign_img = req.body.sign_img;
  let active = req.body.active;

  let sql =
    "UPDATE users SET username=?, email=?, password=?, sign_img=?, active=?, updated_at = now() WHERE user_id=?";
  connection.query(
    sql,
    [username, email, password, active, sign_img, user_id],
    (err, rows, fields) => {
      if (err) throw err;

      let response = {
        message: "Data berhasil diupdate",
        affectedRows: rows.affectedRows,
      };
      return res.json(response);
    }
  );
});

router.post("/:user_id/delete", (req, res, next) => {
  let connection = db.connection;

  let user_id = req.params.user_id;

  let sql = "DELETE FROM users WHERE user_id=?";
  connection.query(sql, [user_id], (err, rows, fields) => {
    if (err) throw err;

    let response = {
      message: "Data berhasil dihapus",
      affectedRows: rows.affectedRows,
    };

    return res.json(response);
  });
});

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.redirect("./login");
  }

  jwt.verify(token, "yourSecretKey", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    res.redirect("./login");
    next();
  });
};

router.get("/login", (req, res) => {
  res.render("login", {
    title: "login",
    layout: false,
  });
});
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const token = await login(req, res, email, password);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Jangan Error PLEASE" });
  }
});

// Middleware untuk otentikasi JWT

router.get("/profil", async (req, res) => {
  try {
    // Access user information from req.user
    const { user_id, username, email } = req.user;
    res.render("profile", {
      title: username,
      layout: "./layout/main-layout",
      user_id,
      username,
      email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// Protected route that requires authentication

// Start server

module.exports = router;
