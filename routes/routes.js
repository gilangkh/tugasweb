const { default: axios } = require('axios');
const express = require('express')
const router= express.Router()
const path= require('path')
const jwtDecoded = require('jwt-decode')

// AUTHENTICATE
router.get("/login1", (req, res) => {
    const filePath = path.join(__dirname, "../public", "login.html");
   
    res.sendFile(filePath);
  });

  router.get('/profil', async (req, res) => {
    const token = req.session.token; // Ambil token dari session (sesuaikan dengan implementasi token Anda)
  
    if (!token) {
      console.log("Login gagal");
      return res.redirect('/login1');
      
    } 
    

    try {
        const decodedToken = jwtDecoded(token);
        console.log(decodedToken)
      res.sendFile(path.join(__dirname, '../public/new.html'));
      console.log("Login berhasil");
    } catch (error) {
      console.log("Token tidak valid:", error);
      return res.redirect('/login');
    }
  });



// USER


// DOKUMEN



// SIGN
  

module.exports = router


