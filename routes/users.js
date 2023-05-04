var express = require('express');
var router = express.Router();
var db = require('../modules/db');
const bodyParser = require('body-parser');
var {User,login} = require('../models/users');
const { response } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', (req, res, next) => {
  
  let connection = db.connection;
  
  let sql = "SELECT user_id, username, email, active FROM users";
  connection.query(sql, (err, rows, fields) => {
    if(err) throw err;
    
    res.json(rows);
  });
  
});

router.post('/', async (req, res, next) => {
  
  let user_id = req.body.user_id;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let active = req.body.active;
  let sign_img = req.body.sign_img;
  
  await User.create({
    user_id : user_id,
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
        res.json(response);
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
        
        res.json(response);
      });
    });

    router.post('/login', async (req, res) => {
      const { email, password } = req.body;
    
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Email atau password salah' });
      }
    
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Email atau password salah' });
      }
    
      const token = jwt.sign({ userId: user.user_id }, 'rahasia');
    
      res.json({ token });
    });
   
   

const app = express();

// Middleware for parsing request body
app.use(bodyParser.json());

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Call login function to authenticate user
    const token = await login(req, res);
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Middleware for JWT authentication
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

// Protected route that requires authentication
app.get('/profile', authenticateJWT, async (req, res) => {
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
    