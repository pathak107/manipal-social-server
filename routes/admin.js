var express = require('express')
var router = express.Router()

//importing admin controller
const placeController=require('../controllers/placeController');

//Admin user related routes
router.post('/login',(req,res)=>{});

//Place related routes
router.post('/createPlace',placeController.place_create)
router.get('/listPlaces',placeController.place_get_all);
router.delete('/deletePlace/:placeID',placeController.place_delete);
router.put('/updatePlace/:placeID',placeController.place_update);

module.exports = router