var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var Dokument = require('../models/signature');
const { response } = require('express');


router.get('/', (req, res, next) => {
  
    let connection = db.connection;
    
    let sql = "SELECT document_id, name, filename, description FROM documents";
    connection.query(sql, (err, rows, fields) => {
      if(err) throw err;
      res.render("documentIndex",{
        data:rows,
        title:"Dokumen|List",
        layout:'./layout/main-layout'
      })
      return res.json(rows);
    });
    
  });
module.exports = router