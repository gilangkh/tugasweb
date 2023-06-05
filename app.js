/** @format */

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
const mysql = require("mysql2");
const expressLayouts = require("express-ejs-layouts");
const bcrypt = require("bcrypt");
const FormData = require("form-data");
const multer = require('multer')
const data = new FormData();
const upload = multer({ dest: 'uploads/' });



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(expressLayouts);

/* ================================================================*/
/*                        U        S      E     R                  */
/* ================================================================*/

// authenticate
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
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let sign_img = req.body.sign_img;

  const createUser = {
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

app.post("/user/:user_id/delete", (req, res) => {
  let user_id = req.params.user_id;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/user/" + user_id + "/delete",
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.status(200).redirect("/users");
    })
    .catch((error) => {
      console.log(error);
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

/* =================================================================================*/
/*                                        DOKUMENT                                  */
/* =================================================================================*/

// list dokumen
app.get("/dokumen/index", (req, res) => {
  let config = "http://localhost:3000/document/index";

  axios
    .get(config)
    .then(function (response) {
      res.render("documentIndex", {
        title: "List Dokument",
        layout: "./layout/main-layout",
        data: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

//create dokumen
app.get("/dokumen/create", (req, res) => {
  res.render("createDokumen", {
    title: "createDokumen",
    layout: "./layout/main-layout",
  });
});
// --------------
app.post("/dokumen/create", (req, res) => {
  let url = "http://localhost:3000/document/create";
  let document_id = req.body.document_id;
  let name = req.body.name;
  let filename = req.body.filename;
  let description = req.body.description;

  const createDoc = {
    document_id: document_id,
    name: name,
    filename: filename,
    description: description,
  };

  axios
    .post(url, createDoc)
    .then(function (response) {
      console.log("status", response.status);
      console.log("data", response.data);
      res.status(200).redirect("/dokumen/index");
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ error: "FRONT END ERROR KACIAN" });
    });
});

// Edit Dokumen

app.get("/dokumen/:document_id", (req, res) => {
  let document_id = req.params.document_id;
  const url = "http://localhost:3000/document/" + document_id;
  axios.get(url).then(function (response) {
    const doc = response.data;
    res.render("editDokumen", {
      title: "Edit Dokumen",
      layout: "./layout/main-layout",
      doc: doc,
    });
  });
});

app.post("/dokumen/:document_id/update", (req, res) => {
  let document_id = req.params.document_id;
  let name = req.body.name;
  let filename = req.body.filename;
  let description = req.body.description;

  let url = "http://localhost:3000/document/" + document_id + "/update";
  const newUser = {
    name: name,
    filename: filename,
    description: description,
  };

  axios
    .post(url, newUser)
    .then(function (response) {
      console.log(response.status);
      console.log(response.data);
      res.status(200).redirect("/dokumen/index");
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ error: "FRONT END ERROR" });
    });
});

app.post("/dokumen/:document_id/delete", (req, res) => {
  let document_id = req.params.document_id;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/document/" + document_id + "/delete",
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.status(200).redirect("back");
    })
    .catch((error) => {
      config.log(error);
    });
});

/*================================================================================== */
/*                                        AUTH                                       */
/* ================================================================================= */

app.get("/login", (req, res) => {
  res.render("login", {
    title: "login",
    layout: false,
  });
});

app.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let data = JSON.stringify({
    email: email,
    password: password,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.status(200).redirect("/users");
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/user/profile", async (req, res) => {
  const token = req.header("Authorization");

  try {
    const response = await axios.get("http://localhost:3000/user/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const user = response.data.response.user;
    const token = response.data.response.token;

    res.render("profile", {
      title: "Profile",
      layout: "./layout/main-layout",
      user: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  
});
/*================================================================================== */
/*                                       TEST                                        */
/* ================================================================================= */


/*================================================================================== */
/*                                        END                                        */
/* ================================================================================= */
app.listen(port, () => console.info("Front-End yang berjalan di port 8000"));
