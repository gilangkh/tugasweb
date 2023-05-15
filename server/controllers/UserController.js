/** @format */

const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { name } = require("ejs");
const controller = {};

const getAllUser = async (req, res) => {
  try {
    const users = await users.findAll();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (req, res) => {
  try {
    let user_id = req.body.user_id;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let active = req.body.active;
    let sign_img = req.body.sign_img;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await User.create({
      user_id: user_id,
      username: username,
      email: email,
      password: hashedPassword,
      active: active,
      sign_img: sign_img,
    });

    let response = {
      message: "data berhasil ditambahkan",
      data: createUser,
    };
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res) => {
  try {
    let user_id = req.body.user_id;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let active = req.body.active;
    let sign_img = req.body.sign_img;

    const hashedPassword = await bcrypt.hash(password, 10);
    const [rowsUpdate, [updatedUser]] = await User.update(
      {
        user_id: user_id,
        username: username,
        email: email,
        password: hashedPassword,
        active: active,
        sign_img: sign_img,
      },
      {
        where: { user_id: user_id },
        returning: true,
      }
    );
    let response = {
      message: "data updated",
      data: updatedUser,
    };
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    let user_id = req.body.user_id;

    const deletedUser = await User.destroy({ where: { user_id: user_id } });

    let response = {
      message: "data berhasil dihapus",
    };
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
};
