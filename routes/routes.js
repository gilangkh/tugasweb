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
    const filePath = path.join(__dirname, '../public', 'profile.html');
    res.sendFile(filePath);
  });

  


/*---------------USER------------*/

router.get('/user/index', (req, res) => {
  const filePath = path.join(__dirname, '../public', 'userIndex.html');
  res.sendFile(filePath);
});
router.get('/users/:user_id', (req, res) => {
  const filePath = path.join(__dirname, '../public', 'new.html');
  res.sendFile(filePath);
});


// DOKUMEN



// SIGN
  

module.exports = router


