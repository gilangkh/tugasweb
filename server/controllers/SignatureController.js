const Signature = require("../models/relation");



const getAllSignature = async (req, res) => {
  try {
    const signatures = await Signature.findAll();
    res.status(200).json(signatures);
  } catch (err) {
    console.log(err);
  }
};

const createSignature = async (req, res, next) => {
  try {
    const { user_id, document_id, jabatan, status } = req.body;

    const createUser = await Signature.create({
      user_id: user_id,
      document_id: document_id,
      jabatan: jabatan,
      status: status,
      signed_at: new Date(),
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

module.exports = {
  getAllSignature,
  createSignature,
  updateSignature,
  deleteSignature,
  getOneSignature,
}
