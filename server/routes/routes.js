const express =require('express')
const UserController = require('../controllers/UserController.js')

const router = express.Router();

// userROuter

router.get('/user/index', UserController.getAllUser)




module.exports = router;