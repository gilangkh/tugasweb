/** @format */

require("dotenv").config;

const jwt = require("jsonwebtoken");

function isLogin(req, res, next) {
  const token = req.cookies.jwt;
}
