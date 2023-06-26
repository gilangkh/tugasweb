const express =require('express')
const UserController = require('../controllers/UserController.js')
const DocumentConrtoller = require('../controllers/DocumentController.js')
const AuthController = require('../controllers/AuthenController.js');
const SignatureController = require('../controllers/SignatureController')
const Middleware = require('../middleware/AuthToken.js')
const router = express.Router();

// Multer 

const multer = require("multer");
const app = express();
const path = require('path');

const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  }
});
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../public/document');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + '-' + file.originalname);
    }
  });
const userFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png'||
    file.mimetype === 'image/jpg'||
    file.mimetype ==='image/jpeg'
    ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const docFilter = (req, file, cb) => {
  if (
    file.mimetype === 'application/msword'||
    file.mimetype === 'application/pdf'

    ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadUser = multer({
    storage:imgStorage,
    fileFilter:userFilter
})
const uploadDoc = multer({
    storage:fileStorage,
    fileFilter:docFilter
})
// AUth
router.post('/login',AuthController.login);
router.post('/user/create',uploadUser.single('sign_img'), UserController.createUser);
router.post('/user/reset',UserController.resetPassword)
router.post('/logout',Middleware,AuthController.logout);
router.post('/user/password/',UserController.resetPassword)
// TEST-------------------------------------------------------------------------------
router.use(Middleware)
// -----------------------------------------------------------------------------------

router.post('/change/:user_id/update',UserController.changePassword)

// UserRouter

router.get('/user/index', UserController.getAllUser);
router.get('/profile',AuthController.getProfile);
router.get('/user/:user_id',UserController.getOneUser)
router.post('/user/:user_id/update',uploadUser.single('sign_img'), UserController.updateUser);
router.post('/user/:user_id/delete', UserController.deleteUser);

// DocumentRouter

router.get('/document/index',DocumentConrtoller.getAllDocuments);
router.post('/document/create',uploadDoc.single('filename'),DocumentConrtoller.createDocument);
router.get('/document/:document_id',DocumentConrtoller.getOneDocument);
router.post('/document/:document_id/update',uploadDoc.single('filename'),DocumentConrtoller.updateDocument);
router.post('/document/:document_id/delete',DocumentConrtoller.deleteDocument);
router.post('/fileDoc/:document_id/update',uploadDoc.single('filename'),DocumentConrtoller.updateFileDocument);

// Singnature Router

router.get('/signature/index',SignatureController.getAllSignature)
router.post('/signature/create',SignatureController.createSignature)
router.get('/signature/:document_id/:user_id',SignatureController.getOneSignature)
router.post('/signature/:document_id/update',SignatureController.updateSignature)
router.post('/signature/:document_id/:user_id/delete',SignatureController.deleteSignature)

// ---V1

router.get("/signature/userIndex",SignatureController.getAllUserSignature)

// ---V2
router.post('/sign/:document_id/:user_id',SignatureController.signDoc)
router.get('/sign/waiting',SignatureController.reqSign)
router.get('/sign/signed',SignatureController.resSign)
router.get('/sign/rejected',SignatureController.decSign)

router.post('/decline/:document_id/:user_id',SignatureController.decSignDoc)

// export
module.exports = router;