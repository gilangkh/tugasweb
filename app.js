/** @format */

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
const mysql = require("mysql2");
const expressLayouts = require("express-ejs-layouts");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(expressLayouts);

//** authenticate */
app.get("/users", (req, res) => {

  var url= 'http://localhost:3000/user/index'
  axios
  .get(url)
  .then(function(response){
    res.render("userIndex", {
      title: "daftar User",
      layout: "./layout/main-layout",
      data : response.data

    });
  })
  .catch(function(error){
    console.log(error)
  })


 
});

app.get("/login", (req, res) => {
  res.render("login", {
    title: "login",
    layout: false,
  });
});

app.get("/profile", (req, res) => {
  res.render("profile", {
    title: "profile",
    layout: "./layout/main-layout",
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
    layout: false,
  });
});

app.get("/dokumen", (req, res) => {
  res.render("document", {
    title: "Dokumen",
    layout: "./layout/main-layout",
  });
});
app.get("/index", (req, res) => {
  res.render("nav", {
    title: "Home",
    layout: "./layout/main-layout",
  });
});
app.get("/sendsign", (req, res) => {
  res.render("sendsign", {
    title: "SendSign",
    layout: "./layout/main-layout",
  });
});
app.get("/sign", (req, res) => {
  res.render("Sign", {
    title: "Sign",
    layout: "./layout/main-layout",
  });
});
app.get("/tview", (req, res) => {
  res.render("template-view", {
    title: "SendSign",
    layout: "./layout/main-layout",
  });
});
app.get("/template", (req, res) => {
  res.render("template", {
    title: "template    ",
    layout: "./layout/main-layout",
  });
});
app.get("/editprofile", (req, res) => {
  res.render("editProfile", {
    title: "Edit Profile",
    layout: "./layout/main-layout",
  });
});

app.get("/password", (req, res) => {
  res.render("editpassword", {
    title: "Edit Password",
    layout: "./layout/main-layout",
  });
});
app.get("/signers", (req, res) => {
  res.render("signers", {
    title: "Signer  ",
    layout: "./layout/main-layout",
  });
});
app.listen(port, () => console.info("Front-End yang berjalan di port 8000"));
