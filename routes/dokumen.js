var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var User = require('../models/dokuments');
const { response } = require('express');

/* GET users listing. */
router.get('/', (req, res, next) => {
  
  //Koneksi ke database
  let connection = db.connection;
  
  let sql = "SELECT user_id, username, email, active FROM users";
  connection.query(sql, (err, rows, fields) => {
    if(err) throw err;
    
    res.json(rows);
  });
  
});

/* TAMBAH USERS */
router.post('/', async (req, res, next) => {
  //1. Buat koneksi ke database
  // let connection = db.connection;
  
  //2. Ambil data yang akan ditambahkan
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let active = req.body.active;
  let sign_img = req.body.sign_img;
  
  //3. Tambahkan data ke dalam database
  await User.create({
    username: username,
    email: email,
    password: password,
    active: active,
    sign_img: sign_img
  
  }).then((res) => {
    let response = {
      message: "Data berhasil ditambahkan",
    };
    
    res.json(response);
  }).catch((err) => {
    console.log(err);
  })

  });
  
  /* EDIT USERS */
  router.post('/:id/edit', (req, res, next) => {
    //1. Koneksi ke databaes
    let connection = db.connection;
    
    //2. Ambil id data yang akan diedit
    let user_id = req.params.user_id;
    
    //3. Ambil data update
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let sign_img = req.body.sign_img;
    let active = req.body.active;
    
    //4. Update data di database
    let sql = "UPDATE users SET username=?, email=?, password=?, avatar=?, active=?, updated_at = now() WHERE user_id=?";
    connection.query(
      sql, 
      [username, email, password, active,sign_img, user_id], 
      (err, rows, fields) => {
        if(err) throw err;
        
        let response = {
          message: "Data berhasil diupdate",
          affectedRows: rows.affectedRows
        }      
        res.json(response);
      });
    });
    
    /* DELETE USERS */
    router.post('/:id/delete', (req, res, next) => {
      //1. Koneksi ke database
      let connection = db.connection;
      
      //2. Ambil ID data yang akan dihapus (M DZAKY)
      let user_id = req.params.user_id;
      
      //3. Hapus data dari database
      let sql = 'DELETE FROM users WHERE id=?';
      connection.query(sql, [user_id], (err, rows, fields) => {
        if(err) throw err;
        
        let response = {
          message: "Data berhasil dihapus",
          affectedRows: rows.affectedRows
        };
        
        res.json(response);
      });
    });
   
    module.exports = router;
    