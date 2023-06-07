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
const multer = require("multer");
const { token } = require("morgan");
const data = new FormData();
const path = require("path");
const e = require("cors");
const MIDDLEWARE = require('./server/middleware/AuthToken')
const fs = require("fs");
const cookieParser = require('cookie-parser')



app.use(cookieParser())
app.use(express.static("public"));
app.use("/server/public", express.static("/server/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(expressLayouts);

const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/document");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});
const userFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const docFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/msword" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadUser = multer({
  storage: imgStorage,
  fileFilter: userFilter,
});
const uploadDoc = multer({
  storage: fileStorage,
  fileFilter: docFilter,
});



/*================================================================================== */
/*                                        AUTH                                       */
/* ================================================================================= */

// --------LOGIN----------
app.get("/login", (req, res) => {
  res.render("login", {
    title: "login",
    layout: false,
  });
});



app.post("/login",async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let data = JSON.stringify({
    "email": email,
    "password":password
  });

  let config = { 
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/login',
    headers: { 
      'Content-Type': 'application/json', 
    },
    data : data
  };
 
  axios.request(config)
  
  .then((response) => {
  
    console.log(JSON.stringify(response.data));
    res.status(200).cookie('token',response.data.token).setHeader('Cookie',response.data.token).redirect('/dokumen/index')
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error);
  });
});

// --------------REGISTER-------------

app.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
    layout: false,
  });
});

app.post("/user/create", uploadUser.single("sign_img"), (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let sign_img = req.file.filename;
  let data = new FormData();
  data.append("username", username);
  data.append("email", email);
  data.append("password", password);
  data.append("sign_img", fs.createReadStream("public/images/" + sign_img));

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/user/create",
    headers: {
      'Content-type':'multipart/form-data',
      ...data.getHeaders(),
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.status(200).redirect("/login");
    })
    .catch((error) => {
      console.log(error);
      res.status(400).redirect("/login");
    });
});

/*================================================================================== */
/*                                        MIDDLEWARE                                       */
/* ================================================================================= */


app.use(MIDDLEWARE)

app.get("/user/profile", async (req, res) => {

  try {
    const response = await axios.get("http://localhost:3000/user/profile", {
      headers: {
        "Content-Type": "application/json",
        'Cookies': req.cookies.token,
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

// -------------LOGOUT---------------

app.post("/user/logout",async(req,res)=>{
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/logout',
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });

})
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
  const token = req.cookies.token
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/document/index',
    headers: { 
      "Content-Type": "application/json",
    }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    res.cookie('token',token,{httpOnly:true}).setHeader('Cookie',token)
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
app.post("/dokumen/create", uploadDoc.single("filename"), (req, res) => {
  let name = req.body.name;
  let filename = req.file.filename;
  let user_id = req.body.user_id;
  let description = req.body.description;
  let data = new FormData();
  data.append("name", name);
  data.append("filename", fs.createReadStream("./public/document/" + filename));
  data.append("description", description);
  data.append("user_id", user_id);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/document/create",
    headers: {
      "Content-Type": "application/json, multipart/form-data",
      Cookie:
        "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiVVVJRCIsImVtYWlsIjoiYmFydTJAZ21haWwuY29tIiwiaWF0IjoxNjg1OTU5MDc0LCJleHAiOjE2ODU5NjI2NzR9.QfZj1qOvB4PpcvkHtJtgGA8lvHOcxN-pp0W5u-6LmUE",
      ...data.getHeaders(),
    },
    data: data,
  };
  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.status(200).redirect("/dokumen/index");
    })
    .catch((error) => {
      console.log(error);
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

app.post(
  "/dokumen/:document_id/update",
  uploadDoc.single("filename"),
  (req, res) => {
    let name = req.body.name;
    let filename = req.file.filename;
    let description = req.body.description;

    let data = new FormData();
    data.append("name", name);
    data.append(
      "filename",
      fs.createReadStream("./public/document/" + filename)
    );
    data.append("description", description);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/document/2bc5f9d0-355e-460b-b725-4f2820d93f13/update",
      headers: {
        "Content-Type": "application/json",
        ...data.getHeaders(),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        res.status(200).redirect("back");
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

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
/*                                       TEST                                        */
/* ================================================================================= */

/*================================================================================== */
/*                                        END                                        */
/* ================================================================================= */
app.listen(port, () => console.info("Front-End yang berjalan di http://localhost:8000"));
