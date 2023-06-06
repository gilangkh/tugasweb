const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");

dotenv.config();



const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "GA ADA TOKEN" });
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "TOKEN SALAH" });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateJWT