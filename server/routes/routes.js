const express =require('express')
const UserController = require('../controllers/UserController.js')
const DocumentConrtoller = require('../controllers/DocumentController.js')
const AuthController = require('../controllers/AuthenController.js');
const SignatureController = require('../controllers/SignatureController')
const router = express.Router();

// AUth

router.post('/login',AuthController.login);
router.get('/user/profile',AuthController.authenticateJWT,AuthController.getProfile);
router.post('/logout',AuthController.logout);

// UserRouter

router.get('/user/index', UserController.getAllUser);
router.post('/user/create', UserController.createUser);
router.get('/user/:user_id',UserController.getOneUser)
router.post('/user/:user_id/update', UserController.updateUser);
router.post('/user/:user_id/delete', UserController.deleteUser);

// DocumentRouter

router.get('/document/index',DocumentConrtoller.getAllDocuments);
router.post('/document/create',DocumentConrtoller.createDocument);
router.get('/document/:document_id',DocumentConrtoller.getOneDocument);
router.post('/document/:document_id/update',DocumentConrtoller.updateDocument);
router.post('/document/:document_id/delete',DocumentConrtoller.deleteDocument);

// Singnature Router
router.get('/signature/index',SignatureController.getAllSignature)
router.post('/create/signature',SignatureController.createSignature)
router.get('/signature/:user_id/:document_id',SignatureController.getOneSignature)
router.post('/signature/:user_id/:document_id/update',SignatureController.updateSignature)
router.post('/signature/:used_id/:document',SignatureController.deleteSignature)

// export
module.exports = router;