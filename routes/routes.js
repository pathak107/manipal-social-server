var express = require('express')
var router = express.Router()

//auth middleware
const checkAuth = require('../middleware/check-auth');


//importing controllers
const placeController=require('../controllers/placeController');
const userController=require('../controllers/userController');
const cabController=require('../controllers/cabController');
const eventController=require('../controllers/eventController');
const expController=require('../controllers/experiencesController');


//Admin user related routes
//===================================================================================
router.post('/login',(req,res)=>{});

//Admin Place related routes
router.post('/createPlace',placeController.place_create)
router.get('/listPlaces',placeController.place_get_all);
router.delete('/deletePlace/:placeID',placeController.place_delete);
router.put('/updatePlace/:placeID',placeController.place_update);

//Admin events related routes
router.get('/listEvents',eventController.events_get_all);
router.post('/createEvent',eventController.event_create);
router.patch('/editEvent/:eventID',eventController.event_update);
router.delete('/deleteEvent/:eventID',eventController.event_delete);

//Admin upcoming events related routes
router.get('/listUpcomingEvents',eventController.upcomingevents_get_all);
router.post('/createUpcomingEvent',eventController.upcomingevent_create);
router.patch('/editUpcomingEvent/:upcomingEventID',eventController.upcomingevent_update);
router.delete('/deleteUpcomingEvent/:upcomingEventID',eventController.upcomingevent_delete);

//Admin user related routes
router.get('/listUsers',userController.user_get_all);

//================================================================================================

//cab related routes
router.post('/getCabShares',checkAuth,cabController.cab_shares_find);




//user related routes
router.post('/register', userController.user_register)
router.post('/login',userController.user_login )
router.patch('/changePassword',checkAuth,userController.user_password_change);
router.delete('/deleteAccount',checkAuth,userController.user_account_delete);
router.patch('/storeFcm/:fcmToken',checkAuth,userController.store_fcmToken);



//event related routes
router.get('/list',checkAuth,eventController.events_get_all);
router.get('/upcomingEvents',checkAuth,eventController.upcomingevents_get_all);



//experience related routes
router.get('/list/:placeID',checkAuth,expController.exp_get_all);
router.post('/newExp/:placeID',checkAuth,expController.exp_create);
router.patch('/editExp/:expID',checkAuth,expController.exp_update);
router.delete('/deleteExp/:expID',checkAuth,expController.exp_delete_user);
router.patch('/updateLikes/:expID',checkAuth,expController.exp_update_likes);

module.exports = router