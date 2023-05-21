const express =require('express')
const UserController = require('../controllers/UserController.js')

const router = express.Router();

// userROuter

router.get('/user/index', UserController.getAllUser)
router.post('/user/create', UserController.createUser);
router.post('/user/:user_id/update', UserController.updateUser);
router.post('/user/:user_id/delete', UserController.deleteUser);


module.exports = router;