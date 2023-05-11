var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var Dokument = require('../models/dokuments');
const { response } = require('express');



//READ
router.get('/', (req, res, next) => {
  
  let connection = db.connection;
  
  let sql = "SELECT document_id, name, filename, description FROM documents";
  connection.query(sql, (err, rows, fields) => {
    if(err) throw err;
    res.render("documentIndex",{
      data:rows,
      title:"Dokumen | List",
      layout:'./layout/main-layout'
    })
    return res.json(rows);
  });
  
});

//CREATE
router.post('/', async (req, res, next) => {

  let document_id = req.body.document_id;
  let name = req.body.name;
  let filename = req.body.filename;
  let description = req.body.description

  await Dokument.create({
    document_id : document_id,
    name : name,
    filename : filename,
    description : description,
  
  }).then((res) => {
    let response = {
      message: "Data berhasil ditambahkan",
    };
    
    return res.json(response);
  }).catch((err) => {
    console.log(err);
  })

  });
  
 //EDIT
  router.post('/:document_id/edit', (req, res, next) => {
   
    let connection = db.connection;
    

    let dokument_id = req.params.dokument_id;
    

    
    let name = req.body.name;
    let filename = req.body.filename;
    let description = req.body.description;

    let sql = "UPDATE dokuments SET name=?, filename=?, description=?, updated_at = now() WHERE dokument_id=?";
    connection.query(
      sql, 
      [name, filename, description, dokument_id], 
      (err, rows, fields) => {
        if(err) throw err;
        
        let response = {
          message: "Data berhasil diupdate",
          affectedRows: rows.affectedRows
        }      
        return res.json(response);
      });
    });
    
    //DELETE
    router.post('/:dokument_id/delete', (req, res, next) => {
      
      let connection = db.connection;
      
      let dokument_id = req.params.dokument_id;
      
      let sql = 'DELETE FROM dokuments WHERE dokument_id=?';
      connection.query(sql, [dokument_id], (err, rows, fields) => {
        if(err) throw err;
        
        let response = {
          message: "Data berhasil dihapus",
          affectedRows: rows.affectedRows
        };
        
        return res.json(response);
      });
    });
   
    module.exports = router;
    