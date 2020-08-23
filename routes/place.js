const express = require('express')
const router = express.Router()

//importing auth middleware
const checkAuth=require('../middleware/check-auth')

//importing controller
const placeController=require('../controllers/placeController')

router.get('/',checkAuth,placeController.place_get_all)

module.exports = router