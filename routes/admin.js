var express = require('express')
var router = express.Router()

//importing admin controller
const adminController=require('../controllers/adminController');

//register new users
router.post('/login',(req,res)=>{});

router.post('/createPlace',adminController.create_place)

module.exports = router