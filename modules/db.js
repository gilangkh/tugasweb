var mysql = require('mysql2')

function connectToDb() {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dokumen"   
  });
  
  connection.connect();
  
  const db = {
    connection : connection
  };
  
  console.log(db);
  
  return db;
}

module.exports = connectToDb();
