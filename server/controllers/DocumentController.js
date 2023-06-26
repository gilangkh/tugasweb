/** @format */

const relation = require("../models/relation");
const Document = relation.Document
const User = relation.User
const Sequelize = require('sequelize')
const path =require('path')
const fs = require('fs')
const multer =require('multer')



const getAllDocuments = async (req, res) => {
  try {
    const user_id = req.user.user_id
    const documents = await Document.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],

        },
        
      ],
      where:{user_id:user_id}
    });

    res.status(200).json(documents);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Kesalahan saat mengambil dokumen" });
  }
};

  const createDocument = async (req, res, next) => {
    try {
      let document_id = req.body.document_id;
      let name = req.body.name;
      let filename = req.file.filename;
      let description = req.body.description;
      let user_id = req.user.user_id
      const createDocument = await Document.create({
        document_id: document_id,
        name: name,
        filename: filename,
        description: description,
        user_id : user_id
      });

      let response = {
        message: "data berhasil ditambahkan",
        data: createDocument,
      };
      console.log(response);
      return res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "data gagal ditambahkan" + err });
    }
  };

const updateDocument = async (req, res) => {
  const document_id = req.params.document_id;
  const data = req.body;

  try {
    const updatedDocument = await Document.findOne({
      where: { document_id: document_id },
    });
    //  const oldData = path.join('E:\\Magang Lea\\inventaris\\tugasweb\\public\\document',updatedDocument.filename);
    // fs.unlinkSync(oldData)

    if (updatedDocument) {

        updatedDocument.name = data.name,
        updatedDocument.description = data.description,

        await updatedDocument.save();

      let response = {
        message: "data berhasil diubah",
        data: updatedDocument,
      };
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "data tidak ditemukan" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "KACIAN ERROR",
    });
  }
};

const deleteDocument = async (req, res) => {
  let document_id = req.params.document_id;

  try {
    const deletedDocument = await Document.findOne({
      where: { document_id: document_id },
    });
    // const oldData = path.join('E:\\Magang Lea\\inventaris\\tugasweb\\public\\document',deletedDocument.filename);
    // fs.unlinkSync(oldData)

    if (deletedDocument) {
      await deletedDocument.destroy();

      let response = {
        message: "data berhasil dihapus",
      };
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "data tidak ditemukan" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "KACIAN ERROR" });
  }
};

const getOneDocument = async (req, res) => {
  let document_id = req.params.document_id;
  try {
    const document = await Document.findOne({
      where: { document_id: document_id },
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    if (document) {
      res.status(200).json(document);
    } else {
      res.status(404).json({ message: "data tidak ditemukan" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "KACIAN ERROR" });
  }
};


const updateFileDocument = async (req, res) => {
  const document_id = req.params.document_id;

  try {
    const updatedDocument = await Document.findOne({
      where: { document_id: document_id },
    });
    // const oldData = path.join('E:\\Magang Lea\\inventaris\\tugasweb\\public\\document',updatedDocument.filename);
    // fs.unlinkSync(oldData)

    if (updatedDocument) {

        updatedDocument.filename = req.file.filename
        await updatedDocument.save();

      let response = {
        message: "data berhasil diubah",
        data: updatedDocument,
      };
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "data tidak ditemukan" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "KACIAN ERROR",
    });
  }
};

module.exports = {
  getAllDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  getOneDocument,
  updateFileDocument
};
