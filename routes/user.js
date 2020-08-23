var express = require('express')
var router = express.Router()

//importing controllers
const userController=require('../controllers/userController');

//for registering new users
router.post('/register', userController.user_register)

router.post('/login',userController.user_login )

router.get('/',userController.user_get_all)

module.exports = router