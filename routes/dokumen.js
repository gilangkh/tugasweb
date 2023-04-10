var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var User = require('../models/dokuments');
const { response } = require('express');

/* GET users listing. */
router.get('/', (req, res, next) => {
  
  //Koneksi ke database
  let connection = db.connection;
  
  let sql = "SELECT dokument_id, name, filename, description FROM dokuments";
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

  let name = req.body.email;
  let filename = req.body.filename;
  let description = req.body.description

  //3. Tambahkan data ke dalam database
  await User.create({
    name : name,
    filename : filename,
    description : description,
  
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
    let name = req.body.name;
    let filename = req.body.filename;
    let description = req.body.description;
    
    //4. Update data di database
    let sql = "UPDATE users SET name=?, filename=?, description=?, updated_at = now() WHERE dokument_id=?";
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
    