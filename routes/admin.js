var express = require('express')
var router = express.Router()

//importing controllers
const placeController=require('../controllers/placeController');
const userController=require('../controllers/userController');

//Admin user related routes
router.post('/login',(req,res)=>{});

//Place related routes
router.post('/createPlace',placeController.place_create)
router.get('/listPlaces',placeController.place_get_all);
router.delete('/deletePlace/:placeID',placeController.place_delete);
router.put('/updatePlace/:placeID',placeController.place_update);

//user related routes
router.get('/listUsers',userController.user_get_all);

module.exports = router