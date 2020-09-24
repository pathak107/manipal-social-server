var express = require('express')
var router = express.Router()

//importing auth middleware
const checkAuth=require('../middleware/check-auth')

//importing controller
const cabController=require('../controllers/cabController');

router.post('/getCabShares',checkAuth,cabController.cab_shares_find);

module.exports = router