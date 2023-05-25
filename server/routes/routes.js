const express =require('express')
const UserController = require('../controllers/UserController.js')
const DocumentConrtoller = require('../controllers/DocumentController.js')
const AuthController = require('../controllers/AuthenController.js');
const router = express.Router();

// AUth

router.post('/login',AuthController.login)

// UserRouter

router.get('/user/index', UserController.getAllUser)
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



module.exports = router;