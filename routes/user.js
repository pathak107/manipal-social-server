var express = require('express')
var router = express.Router()

//importing controllers
const userController=require('../controllers/userController');
const checkAuth = require('../middleware/check-auth');

//for registering new users
router.post('/register', userController.user_register)

router.post('/login',userController.user_login )

router.patch('/changePassword',checkAuth,userController.user_password_change);

router.delete('/deleteAccount',checkAuth,userController.user_account_delete);

router.patch('/storeFcm/:fcmToken',checkAuth,userController.store_fcmToken);

module.exports = router