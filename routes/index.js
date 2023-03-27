var express = require('express');
var router = express.Router();
var app = express()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});


app.listen(8000, function(){
  console.log("port 30000")
})
module.exports = router;
