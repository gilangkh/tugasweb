/** @format */

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
const mysql = require("mysql2");
const expressLayouts = require("express-ejs-layouts");
const bcrypt = require("bcrypt");
const { post } = require("./server/routes/routes");
const FormData =require('form-data')
const data = new FormData()

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(expressLayouts);

//** authenticate */
app.get("/users", (req, res) => {
  var url = "http://localhost:3000/user/index";
  axios
    .get(url)
    .then(function (response) {
      res.render("userIndex", {
        title: "daftar User",
        layout: "./layout/main-layout",
        data: response.data,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
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

app.post("/user/create", (req, res) => {
  let user_id = req.body.user_id;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let sign_img = req.body.sign_img;

  const createUser = {
    user_id: user_id,
    username: username,
    email: email,
    password: password,
    active: 1,
    sign_img: sign_img,
  };

  axios
    .post("http://localhost:3000/user/create", createUser)
    .then(function (response) {
      console.log("Status:", response.status);
      console.log("Data:", response.data);
      res.status(200).redirect("/users");
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ error: "FRONT END ERROR" });
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

// Menampilkan User

app.get("/user/:user_id", (req, res) => {
  let user_id = req.params.user_id;
  const url = "http://localhost:3000/user/" + user_id;

  axios.get(url).then(function (response) {
    const user = response.data;
    res.render("editProfile", {
      title: "edit User",
      layout: "./layout/main-layout",
      user: user,
    });
  });
});

app.post("/user/:user_id/update", (req, res) => {
  let user_id = req.params.user_id;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let active = req.body.active;
  let sign_img = req.body.sign_img;

  const url = "http://localhost:3000/user/" + user_id + "/update";
  const newUser = {
    username: username,
    email: email,
    password: password,
    active: active,
  };

  axios
    .post(url, newUser)
    .then(function (response) {
      console.log("Status:", response.status);
      console.log("Data:", response.data);
      res.status(200).redirect("/users");
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ error: "FRONT END ERROR" });
    });
});

app.post('/user/:user_id/delete',(req,res)=>{
  let user_id=req.params.user_id
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/user/'+user_id+'/delete',
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    res.status(200).redirect('back')
  })
  .catch((error) => {
    console.log(error);
  });

})




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
