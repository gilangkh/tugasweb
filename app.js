/** @format */

const express = require("express");
const axios = require('axios');
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
const mysql = require("mysql2");
const expressLayouts = require("express-ejs-layouts");
const FormData = require("form-data");
const multer = require("multer");
const Router = require('./routes/routes')
const data = new FormData();
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const session = require('express-session');
const authenticateToken = require("./server/middleware/AuthToken");

app.use('/static', express.static('public', { 
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));
app.use(session({
  secret: 'gilang',
  resave: false,
  saveUninitialized: true
}));

app.use('/public', express.static(path.join(process.cwd(), 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use("/",Router)



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

// --------------REGISTER-------------

app.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
    layout: false,
  });
});


/* ================================================================*/
/*                        U        S      E     R                  */
/* ================================================================*/
//------------- List Users---------------

app.get("/users", (req, res) => {
   res.render("userIndex", {
        title: "Daftar User",
        layout: "./layout/layout.ejs",
       });
});

//------------ Profile User--------------
app.get("/profile", (req, res) => {
  res.render("profile", {
    title: "profile",
    layout: "./layout/layout.ejs",
  });
});



// Menampilkan User

app.get("/user/:user_id", (req, res) => {
  res.render("editProfile", {
    title: "Edit Profile",
    layout: "./layout/layout.ejs",
  });
});
app.post("/user/:user_id/update", uploadUser.single("sign_img"), (req, res) => {
  res.json({ message: "File berhasil diunggah" });
});

/* =================================================================================*/
/*                                        DOKUMENT                                  */
/* =================================================================================*/

// list dokumen
app.get("/dokumen/index", (req, res) => {
  let token = req.headers["cookie"]
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/document/index',
    headers: { 
      "Content-Type": "application/json",
      'authorization' :'Bearers '+token
    }
  };
  
  config.withCredentials=true;
  axios.request(config)
  .then((response) => {
    const key = Object.keys(req.headers)
    console.log(JSON.stringify("dokumen respons sesi = " +key));
    console.log("ini tokens = "+token)
    res.render("documentIndex",{
      title :"list dokumen",
      layout : "./layout/main-layout"
    })
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
app.get("/signers", (req, res) => {
  res.render("signers", {
    title: "Signer  ",
    layout: "./layout/main-layout",
  });
});
/*================================================================================== */
/*                                        END                                        */
/* ================================================================================= */
app.listen(port, () => console.info("Front-End yang berjalan di http://localhost:8000"));
