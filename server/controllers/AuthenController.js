const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const dotenv = require('dotenv');

const session = require("express-session");

dotenv.config();

const generateToken = (user) => {
  return jwt.sign({ user_id: user.user_id, email: user.email }, process.env.SECRET_TOKEN, {
    expiresIn: "20m",
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let datetime = new Date().toISOString()
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email :email} });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    const token = generateToken(user);
    let response ={
      token : token,
      datetime :datetime,
      session : token
    }
    req.session.token = token;
    req.session.save();
    res.setHeader('authorization',token)
    res.status(200).json({ response ,message:"login succes"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// JWT

const getProfile = async (req, res) => {

  try {
    const { user_id } = req.user;
    const user = await User.findOne({ where: { user_id:user_id } });

    if (!user) {
      return res.status(400).json({ message: "tidak ketemu" });
    }
    let response = {
      user: user,
    };

    console.log(response);
    res.status(200).json({ response });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "KACIAN ERROR" });
  }
};


const logout = async (req, res) => {
  const token = req.headers.authorization || req.body.token;
console.log(token)
  // try {
  //   // Mendapatkan token dari header atau body request
  //   const token = req.headers.authorization || req.body.token;

  //   // Mengecek apakah token sudah digunakan sebelumnya
  //   if (usedTokens.includes(token)) {
  //     return res.status(401).json({ message: "Token has already been invalidated" });
  //   }

  //   // Menandai token sebagai expired dan tambahkan ke daftar usedTokens
  //   usedTokens.push(token);

  //   res.status(200).json({ message: "Logout success" });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ message: "Internal Server Error" });
  // }
};


module.exports = {
  login,
  getProfile,
  logout,
};
