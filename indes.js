//jshint esversion:6

const express = require("express");

const app = express()

app.get('/',function(request,response){
    response.send("<title>Buku</title>" )
});

app.listen(3000, function(){
    console.log("server starter on port 3000")
});