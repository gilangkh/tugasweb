/** @format */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");

const generateToken = (user) => {
  return jwt.sign({ user_id: user.user_id, email: user.email }, "gilang", {
    expiresIn: "1h",
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email required" });
    } else if (!password) {
      return res.status(400).json({ message: " password are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "GA ADA TOKEN" });
  }

  jwt.verify(token, "gilang", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "TOKEN SALAH" });
    }

    req.user = decoded;
    next();
  });
};

const getProfile = async (req, res) => {
  const token = req.header("Authorization");
  try {
    const { user_id } = req.user;
    const user = await User.findOne({ where: { user_id } });

    if (!user) {
      return res.status(400).json({ message: "tidak ketemu" });
    }
    let response = {
      user: user,
      token: token,
    };
    console.log(response);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "KACIAN ERROR" });
  }
};
let invalidToken = [];
const logout = (req, res) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    invalidToken.push(token);
    res.status(200).json({ message: "logout success" });
  } catch (error) {
    console.error(error);
    res.statu(500).json({ error: "Kacian ERROR" });
  }
};
module.exports = {
  login,
  authenticateJWT,
  getProfile,
  logout,
};
