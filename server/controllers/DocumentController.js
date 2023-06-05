/** @format */

const Document = require("../models/dokuments");
const path =require('path')
const fs = require('fs')
const multer =require('multer')



const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll();
    res.status(200).json(documents);
  } catch (err) {
    console.log(err);
    res.status(500).json({error:"KACIAN EROR"})
  }
};

const createDocument = async (req, res, next) => {
  try {
    let document_id = req.body.document_id;
    let name = req.body.name;
    let filename = req.file.path;
    let description = req.body.description;

    const createDocument = await Document.create({
      document_id: document_id,
      name: name,
      filename: filename,
      description: description,
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
    const oldData = path.join('E:\\Magang Lea\\inventaris\\tugasweb\\server',updatedDocument.filename);
    fs.unlinkSync(oldData)

    if (updatedDocument) {

        updatedDocument.name = data.name,
        updatedDocument.filename = req.file.path,
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
    const oldData = path.join('E:\\Magang Lea\\inventaris\\tugasweb\\server',deletedDocument.filename);
    fs.unlinkSync(oldData)

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

module.exports = {
  getAllDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  getOneDocument,
};
