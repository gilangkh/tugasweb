
const { PDFDocument } = require("pdf-lib");
const relation = require("../models/relation");
const Signature = relation.Signature
const User = relation.User
const Document = relation.Document
const axios = require('axios');
const fs =require('fs')
const path = require('path')

const getAllSignature = async (req,res) => {
  try {
    const signatures = await Signature.findAll();
    res.status(200).json(signatures);
  } catch (err) {
    console.log(err);
  }
};

const createSignature = async (req, res, next) => {
  try {
    const { user_id, document_id, jabatan } = req.body;

    const createUser = await Signature.create({
      user_id: user_id,
      document_id: document_id,
      jabatan: jabatan,
      status: "0",
      signed_at: "0",
      created_at: new Date(),
      updated_at: new Date(),
    });

    let response = {
      message: "data berhasil ditambahkan",
      data: createUser,
    };
    console.log(response);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "data gagal ditambahkan" + err });
  }
};

const updateSignature = async (req, res) => {
  const { user_id, document_id } = req.params;
  const data = req.body;

  try {
    const signature = await Signature.findOne({
      where: { user_id: user_id, document_id: document_id },
    });

    if (signature) {
      signature.jabatan = data.jabatan;
      signature.status = data.status;
      signature.signed_at = new Date();
      signature.updated_at = new Date();
      await signature.save();

      let response = {
        message: "data berhasil diubah",
        data: signature,
      };
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "data tidak ditemukan" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "KACIAN ERROR" });
  }
};

const deleteSignature = async (req, res) => {
  const { user_id, document_id } = req.params;

  try {
    const signature = await Signature.findOne({
      where: { user_id: user_id, document_id: document_id },
    });

    if (signature) {
      await signature.destroy();

      let response = {
        message: "data berhasil dihapus",
      };
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Data tidak ditemukan" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "KACIAN ERROR" });
  }
};

const getOneSignature = async (req, res) => {
  const { user_id, document_id } = req.params;

  try {
    const signature = await Signature.findOne({
      where: { user_id: user_id, document_id: document_id },
    });

    if (signature) {
      res.status(200).json(signature);
    } else {
      res.status(404).json({ message: "Data tidak ditemukan" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "KACIAN ERROR" });
  }
};


const signDoc = async (req, res) => {
  let {  document_id } = req.body;
  let user_id = req.user.user_id
  const img = await User.findOne({ where: { user_id: user_id } });
  const docPDF = await Document.findOne({ where: { document_id: document_id } });

  const docUrl = 'E:\\Magang Lea\\inventaris\\tugasweb\\public\\document\\' + docPDF.filename;
  const imgUrl = 'E:\\Magang Lea\\inventaris\\tugasweb\\public\\images\\' + img.sign_img; // URL gambar

  try {
    const imageData = fs.readFileSync(imgUrl);
    const pdfData = fs.readFileSync(docUrl);

    // Membuat instance PDFDocument dari data PDF yang ada
    const pdfDoc = await PDFDocument.load(pdfData);

    // Mengakses halaman pertama pada dokumen PDF
    const page = pdfDoc.getPages()[0];

    // Memuat gambar ke dalam dokumen PDF
    const image = await pdfDoc.embedPng(imageData);

    // Mengatur ukuran dan posisi gambar pada halaman
    const scale = 60 / image.height;
    const { width, height } = image.scale(scale);
 // Mengurangi skala gambar menjadi 10%
    const x = 310; // Koordinat x pada pojok kiri halaman
    const y = 370; // Koordinat y pada pojok kiri halaman
    page.drawImage(image, {
      x,
      y,
      width,
      height,
    });

    // Mengenerate hasil dokumen PDF dalam bentuk buffer
    const pdfBytes = await pdfDoc.save();

    const outputFileName = path.join('E:\\Magang Lea\\inventaris\\tugasweb\\public\\document\\', docPDF.filename);
    const targetDirectory = path.join('E:\\Magang Lea\\inventaris\\tugasweb\\public\\old_document\\',docPDF.filename);
    const newFilePath = path.join(targetDirectory);
    fs.renameSync(outputFileName, newFilePath);

     fs.writeFileSync(outputFileName, pdfBytes);
  
    // Memindahkan file dengan nama yang sama ke folder lain
    
    res.contentType('application/pdf');
    res.status(200).send(Buffer.from(pdfBytes));
  } catch (error) {
    console.log('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat menghasilkan PDF' });
  }
}


module.exports = {
  getAllSignature,
  createSignature,
  updateSignature,
  deleteSignature,
  getOneSignature,
  signDoc,
}
