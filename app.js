/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 80;
const mysql = require("mysql2");
const expressLayouts = require("express-ejs-layouts");
const Router = require('./routes/routes')
const path = require("path");
const cors = require("cors");


const session = require('express-session');

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

app.get('/change/:user_id',(req,res)=>{
  res.render("editPassword", {
    title: "Edit Password Dokumen",
    layout: "./layout/layout.ejs",
  });
})

app.get("/reset", (req, res) => {
  res.render("reset", {
    title: "profile",
    layout: false,
  });
});
/* =================================================================================*/
/*                                        DOKUMENT                                  */
/* =================================================================================*/

// -----------list dokumen-----------------
app.get("/dokumen/index", (req, res) => {
  res.render("documentIndex", {
    title: "List Dokumen",
    layout: "./layout/layout.ejs",
  });
});

//-----------create dokumen--------------
app.get("/dokumen/create", (req, res) => {
  res.render("createDokumen", {
    title: "createDokumen",
    layout: "./layout/layout.ejs",
  });
});
// -------------- Edit Dokumen---------
app.get("/document/:document_id", (req, res) => {
  res.render("editDokumen", {
    title: "Edit Dokumen",
    layout: "./layout/layout",
  });
});


app.get("/dokumen/:dokument",(req,res)=>{
  res.render("detail", {
    title: "Edit Dokumen",
    layout: "./layout/layout",
  });
})
app.get("/fileDoc/:document_id",(req,res)=>{
  res.render("editFIle", {
    title: "Edit Dokumen",
    layout: "./layout/layout",
  });
})


/*================================================================================== */
/*                                    SIGNATURE                                      */
/* ================================================================================= */

// List Signature
app.get("/mengajukan", (req, res) => {
  res.render("mengajukan", {
    title: "mengajukan",
    layout: "./layout/layout",
  });
})

app.get("/diajukan", (req, res) => {
  res.render("diajukan", {
    title: "Dokumen Diajukan",
    layout: "./layout/layout",
  });
})
// Create Sinature
  app.get("/signature/create", (req, res) => {
    res.render("createSignature", {
      title: "Create Pengajuan",
      layout: "./layout/layout",
    });
  });

  // Sign Doc
  app.get("/SignDoc/:document_id/:user_id", (req, res) => {
    res.render("signDoc", {
      title: "Sign Dokumen",
      layout: "./layout/layout",
    });
  });
  app.get("/SignUserDoc/:document_id/:user_id", (req, res) => {
    res.render("detailUserSign", {
      title: "Sign Dokumen",
      layout: "./layout/layout",
    });
  });


/*================================================================================== */
/*                                        END                                        */
/* ================================================================================= */
app.listen(port, () => console.info("Front-End yang berjalan di http://localhost:8000"));
