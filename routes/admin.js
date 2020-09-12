var express = require('express')
var router = express.Router()

//importing controllers
const placeController=require('../controllers/placeController');
const userController=require('../controllers/userController');
const eventController=require('../controllers/eventController');

//Admin user related routes
router.post('/login',(req,res)=>{});

//Place related routes
router.post('/createPlace',placeController.place_create)
router.get('/listPlaces',placeController.place_get_all);
router.delete('/deletePlace/:placeID',placeController.place_delete);
router.put('/updatePlace/:placeID',placeController.place_update);

//events related routes
router.get('/listEvents',eventController.events_get_all);
router.post('/createEvent',eventController.event_create);
router.patch('/editEvent/:eventID',eventController.event_update);
router.delete('/deleteEvent/:eventID',eventController.event_delete);

//upcoming events related routes
router.get('/listUpcomingEvents',eventController.upcomingevents_get_all);
router.post('/createUpcomingEvent',eventController.upcomingevent_create);
router.patch('/editUpcomingEvent/:upcomingEventID',eventController.upcomingevent_update);
router.delete('/deleteUpcomingEvent/:upcomingEventID',eventController.upcomingevent_delete);

//user related routes
router.get('/listUsers',userController.user_get_all);

module.exports = router