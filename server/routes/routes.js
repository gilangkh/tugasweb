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
const path = require('path')

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
router.post('/logout',AuthController.logout);


router.use(Middleware)
// UserRouter

router.get('/user/index', UserController.getAllUser);

router.get('/user/profile',AuthController.getProfile);
router.get('/user/:user_id',UserController.getOneUser)
router.post('/user/:user_id/update',uploadUser.single('sign_img'), UserController.updateUser);
router.post('/user/:user_id/delete', UserController.deleteUser);

// DocumentRouter

router.get('/document/index',DocumentConrtoller.getAllDocuments);
router.post('/document/create',uploadDoc.single('filename'),DocumentConrtoller.createDocument);
router.get('/document/:document_id',DocumentConrtoller.getOneDocument);
router.post('/document/:document_id/update',uploadDoc.single('filename'),DocumentConrtoller.updateDocument);
router.post('/document/:document_id/delete',DocumentConrtoller.deleteDocument);

// Singnature Router
router.get('/signature/index',SignatureController.getAllSignature)
router.post('/signature/create',SignatureController.createSignature)
router.get('/signature/:user_id/:document_id',SignatureController.getOneSignature)
router.post('/signature/:user_id/:document_id/update',SignatureController.updateSignature)
router.post('/signature/:user_id/:document_id/delete',SignatureController.deleteSignature)

// export
module.exports = router;