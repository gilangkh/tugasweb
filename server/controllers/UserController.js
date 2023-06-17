  /** @format */
  const express = require('express')
  const Users= require("../models/relation");
  const User = Users.User
  const bcrypt = require("bcrypt");
  const bodyParser = require('body-parser');
  const app = express();
  const path = require('path')
  const multer = require('multer')
  const fs = require('fs')
 
// READ
  const getAllUser = async (req, res) => {

    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
    }
  };

  // CREATE
  const createUser = async (req, res, next) => {
    try {

      // let user_id = req.body.user_id;
      let username = req.body.username;
      let email = req.body.email;
      let password = req.body.password;
      let sign_img = req.file.filename;

      const hashedPassword = await bcrypt.hash(password, 10);

      const createUser = await User.create({
        // user_id: user_id,
        username: username,
        email: email,
        password: hashedPassword,
        active: 1,
        sign_img: sign_img,
      });

      let response = {
        message: "data berhasil ditambahkan",
        data: createUser,
      };
      console.log(response)
      return res.status(200).json(response);
    
    } catch (err) {
      console.log(err);
      return res.status(500).json({error:"data gagal ditambahkan"+err})
    }
  };


  // UPDATE

  const updateUser = async (req, res) => {
    const user_id=req.params.user_id;
    const data = req.body;
 
    try{
      const newData = await User.findOne({where:{user_id:user_id}})
      if(!newData){
        console.log("User Not Found");
      }
      // const oldSign = path.join('E:\\Magang Lea\\inventaris\\tugasweb\\public\\images\\', newData.sign_img)
      // fs.unlinkSync(oldSign)
  
      if(newData)
      {
        newData.username=data.username,
        newData.email =data.email,
         newData.active = data.active,
        newData.updated_at = new Date()
        await newData.save(); 

        let response={
          message :"data berhasil di ubah",
          data :newData
        }
        res.status(200).json(response)
      }else{
        res.status(404).json({message:"data tidak ditemukan"})
      }
    }catch(err){
      console.log(err)
      res.status(500).json({
        error:" KACIAN ERROR"
      })
    }
};

// DELETE
  const deleteUser = async (req, res) => {

    let user_id = req.params.user_id;

    try {
    
      const deletedData = await User.findOne({ where: { user_id: user_id } });

      if(deletedData){
        await deletedData.destroy();

        let response = {
          message: "data berhasil dihapus",
        };
        res.status(200).json(response);
      }else{
        res.status(404).json({message : "Datanya ga ada kocak"})
      }
   
    } catch (err) {
      console.log(err);
      res.status(500).json({err:"KACIAN ERROR"})
    }
  };
  const getOneUser =  async(req,res)=>{
    let user_id = req.params.user_id;
    try
    {
      const user = await User.findOne({where:{user_id:user_id}})

      if(user)
      {
        res.status(200).json(user)
      }else{
        res.status(404).json({message:"Data tidak ditemukans"})
      }
      
    }catch(err){
      console.log(err)
      res.status(500).json({err:"KACIAN ERROR"})
    }
  };
  const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
  
    try {
      const user = await User.findOne({ where: { user_id: req.user.user_id } });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: "Old password is incorrect" });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "An error occurred while changing password" });
    }
  };

  const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
  
    try {
      const user = await User.findOne({ where: { email: email } });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: "Password reset successful" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "An error occurred while resetting password" });
    }
  };
  module.exports = {
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
    getOneUser,
    changePassword,
    resetPassword
  };
