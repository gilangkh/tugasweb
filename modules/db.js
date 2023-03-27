var mysql = require('mysql2')

function connectToDb()
{

var connection = mysql.createConnection({

    host : "localhost",
    username : "root",
    password : "",
    database : "dokumen"   
})
connection.connect()

const db = {
    connection : connection
}

consolo.log(db)

module.exports = db
}