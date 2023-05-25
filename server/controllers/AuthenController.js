/** @format */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");

const generateToken = (user) => {
  return jwt.sign({ user_id: user.user_id, email: user.email }, "gilangbiasa", {
    expiresIn: "1h",
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const tok = createToken({
      
    })



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
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "yourSecretKey", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = {
  login,
  authenticateJWT,
};
