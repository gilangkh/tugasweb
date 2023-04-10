const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

// Database configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'project_login_jwt'
});

// Connect to database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Middleware
app.use(express.json());

// Route for user registration
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Hash password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;

    // Save user to database
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash], (err, result) => {
      if (err) throw err;

      res.status(201).json({
        message: 'User registered successfully'
      });
    });
  });
});

// Route for user login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if user exists in database
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      res.status(401).json({
        message: 'Invalid credentials'
      });
    } else {
      // Compare password with hash
      bcrypt.compare(password, results[0].password, (err, result) => {
        if (err) throw err;

        if (!result) {
          res.status(401).json({
            message: 'Invalid credentials'
          });
        } else {
          // Generate token
          const token = jwt.sign({
            email: results[0].email,
            userId: results[0].id
          }, 'secretkey', {
            expiresIn: '1h'
          });

          res.status(200).json({
            message: 'Login successful',
            token: token
          });
        }
      });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
