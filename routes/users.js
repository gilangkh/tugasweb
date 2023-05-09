var express = require('express');
var router = express.Router();
var db = require('../modules/db');
const bodyParser = require('body-parser');
var {User,login} = require('../models/users');
const { response } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
app.set('view engine','ejs');



router.get('/',  (req, res, next) => {
  
  let connection = db.connection;
  
  let sql = "SELECT user_id, username, email, active FROM users";
  connection.query(sql, (err, rows, fields) => {
    if(err) throw err;
    
    res.render("userIndex",{
      data:rows,
      title:"User|List",
      layout:'./layout/main-layout'
    })

  });

  
});
router.get('/create',(req,res)=>{
    res.render('register',{
      title:"User | Register",
      layout:false
    })
});
router.post('/create', async (req, res, next) => {
  try {
    let user_id = req.body.user_id;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let active = req.body.active;
    let sign_img = req.body.sign_img;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      user_id: user_id,
      username: username,
      email: email,
      password: hashedPassword,
      active: active,
      sign_img: sign_img
    });

    let response = {
      message: "Data berhasil ditambahkan",
      data: newUser
    };

    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Gagal menambahkan data ke database.' });
  }
});

  
  router.post('/:user_id/edit', (req, res, next) => {

    let connection = db.connection;
    
    let user_id = req.params.user_id;
    
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let sign_img = req.body.sign_img;
    let active = req.body.active;
    
    let sql = "UPDATE users SET username=?, email=?, password=?, sign_img=?, active=?, updated_at = now() WHERE user_id=?";
    connection.query(
      sql, 
      [username, email, password, active,sign_img, user_id], 
      (err, rows, fields) => {
        if(err) throw err;
        
        let response = {
          message: "Data berhasil diupdate",
          affectedRows: rows.affectedRows
        }      
        return res.json(response);
      });
    });
    
    
    router.post('/:user_id/delete', (req, res, next) => {
      
      let connection = db.connection;
      
      let user_id = req.params.user_id;
      
      let sql = 'DELETE FROM users WHERE user_id=?';
      connection.query(sql, [user_id], (err, rows, fields) => {
        if(err) throw err;
        
        let response = {
          message: "Data berhasil dihapus",
          affectedRows: rows.affectedRows
        };
        
        return res.json(response);
      });
    });

    router.get('/login', (req, res) => {
      res.render('login',{
        title:"login",
        layout:false
        
      }); 

    });
    router.post('/login', async (req, res) => {
  
      try {

        const{email,password}= req.body;
        // Panggil fungsi login untuk mengautentikasi pengguna
        
        const token = await login(req, res,email,password);
         
        res.redirect('../dokumen/'); 
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Kesalahan server internal' });
      }
    });
    
    async function login(req, res,email, password) {
      try {
        const user = await User.findOne({ where: { email:email } });
    
        if (!user) {
          return res.status(401).json({ message: 'Email salah' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Password salah' });
        }
    
        const token = jwt.sign({ userId: user.user_id }, 'rahasia');
        return res.status(200).json({ token });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Kesalahan server internal' });
      }
    }
    
    // Middleware untuk otentikasi JWT
    const authenticateJWT = (req, res, next) => {
      const token = req.header('Authorization');
    
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    
      jwt.verify(token, 'yourSecretKey', (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next();
      });
    };
    
  

// Middleware for parsing request body
router.use(bodyParser.json());

// Middleware untuk otentikasi JWT


// Protected route that requires authentication
router.get('/profile', authenticateJWT, async (req, res) => {
  try {
    // Access user information from req.user
    const { user_id, username, email } = req.user;
    return res.status(200).json({ user_id, username, email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server

    module.exports = router;
    