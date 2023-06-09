
const { PDFDocument } = require("pdf-lib");
const relation = require("../models/relation");
const Signature = relation.Signature
const User = relation.User
const Document = relation.Document
const axios = require('axios');
const fs =require('fs')
const path = require('path');
const {Op} = require("sequelize")

const getAllSignature = async (req, res) => {
  try {
    const signatures = await Signature.findAll({
      include: [
        {
          model: User,
          attributes: ["username", "email"],
        },
        {
          model: Document,
          attributes: ["name", "filename", "user_id"],
          include :[{
            model:User,
            attributes:["username"]
          }]
        },
      ],
      where: {
        user_id: req.user.user_id,
      },
    });
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
      status: "diajukan",
      signed_at: "0",
      created_at: new Date(),
      updated_at: new Date(),
    });

    let response = {
      message: "Dokumen berhasil di ajukan",
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
        message: "Pengajuan dibatalkan",
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
  const user_id = req.params.user_id;
  const document_id = req.params.document_id;

  try {
    const signature = await Signature.findOne({
      include: [
        {
          model: User,
          attributes: ["username"],
          where: { user_id: user_id },
        },
        {
          model: Document,
          attributes:["name","filename","description"],
          where: { document_id: document_id },
        },
      ],
    });

    if (signature) {
      let response = {
        message: "Berhasil mendapatkan data",
        data: signature,
      };
      res.status(200).json(signature);
    } else {
      res.status(404).json({ message: "Data tidak ditemukan" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Terjadi kesalahan server" });
  }
};



const signDoc = async (req, res) => {
  try {
    let document_id = req.params.document_id;
    let user_sign = req.user.user_id;
    let user_id = req.params.user_id
    const img = await User.findOne({ where: { user_id: user_sign } });
    const docPDF = await Document.findOne({ where: { document_id: document_id } });

    const docUrl = '/home/azureuser/tugasweb/public/document/' + docPDF.filename;
    const imgUrl ='/home/azureuser/tugasweb/public/images/'+img.sign_img; // URL gambar
 
        const imageData = fs.readFileSync(imgUrl);
        const pdfData = fs.readFileSync(docUrl);

        const pdfDoc = await PDFDocument.load(pdfData);
        const page = pdfDoc.getPages()[0];

        const image = await pdfDoc.embedPng(imageData);
        const scale = 60 / image.height;
        const { width, height } = image.scale(scale);

        const x = 310;
        const y = 370;
        page.drawImage(image, {
          x,
          y,
          width,
          height,
        });

        const pdfBytes = await pdfDoc.save();
// 
        const outputFileName = path.join('/home/azureuser/tugasweb/public/document/', docPDF.filename);
        const targetDirectory = path.join('/home/azureuser/tugasweb/public/old_document/', docPDF.filename);
        const newFilePath = path.join(targetDirectory);

        fs.renameSync(outputFileName, newFilePath);
        fs.writeFileSync(outputFileName, pdfBytes);

        const signature = await Signature.findOne({
          where: {
            document_id: document_id,
            user_id: user_id,
          },
        });
    
        if (signature) {
     
          signature.status = "ditandatangani";
          signature.signed_at = new Date();
          signature.updated_at = new Date();
  
        await signature.save();
    
      
    let response = {
      message: "Document berhasil ditandatangani",
      data: signature
    };
    res.status(200).json(response);
  
   }
  } catch (error) {
    console.log('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat menghasilkan PDF' });
  }
};


const reqSign = async (req,res) => {
  try {
    const user_id = req.user.user_id
    const count = await Signature.count({
      where: { status: "diajukan",user_id:user_id },
    });
    console.log("Jumlah signature dengan status 'diajukan':", count);
    res.status(200).json(count)
  } catch (error) {
    console.log(error);
  }
};
const resSign = async (req,res) => {
  try {
    
    const user_id = req.user.user_id
    const count = await Signature.count({
      where: { status: "ditandatangani",user_id:user_id },
    });
    console.log("Jumlah signature dengan status 'diajukan':", count);
    res.status(200).json(count)
  } catch (error) {
    console.log(error);
  }
};
const decSign = async (req,res) => {
  try {
    
    const user_id = req.user.user_id
    const count = await Signature.count({
      where: { 
        user_id : req.user.user_id,
        status: "ditolak" },
    });
    console.log("Jumlah signature dengan status 'diajukan':", count);
    res.status(200).json(count)
  } catch (error) {
    console.log(error);
  }
};

const decSignDoc = async(req,res)=>{
  const user_id = req.params.user_id
  const document_id = req.params.document_id
  try {
    const signature = await Signature.findOne({
      where:{user_id:user_id,
        document_id:document_id}
    })

    if(signature){
    
      signature.status = "ditolak"
      signature.updated_at = new Date();
      
      await signature.save();
      let response = {
        message :  "permintaan berhasil di tolak",
        data : signature
      }
      res.status(200).json(response)
    
    }else{
      res.status(404).json({message:"data tidak ditemnukan"})
    }
  
  } catch (error) {
    console.log(error)
  }
}

const getAllUserSignature = async (req, res) => {
  try {
    const signatures = await Signature.findAll({
      include: [
        {
          model: User,
          attributes: ["username", "email"],
        },
        {
          model: Document,
          attributes: ["name", "filename", "user_id"],
          where: {
            user_id: req.user.user_id,
          },
        },
      ],
    });
    res.status(200).json(signatures);
  } catch (err) {
    console.log(err);
  }
};


module.exports = {
  getAllSignature,
  createSignature,
  updateSignature,
  deleteSignature,
  getOneSignature,
  signDoc,
  reqSign,
  resSign,
  decSign,
  decSignDoc,
  getAllUserSignature
}
