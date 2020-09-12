var express = require('express')
var router = express.Router()

//importing auth middleware
const checkAuth=require('../middleware/check-auth')

//importing controller
const eventController=require('../controllers/eventController');

router.get('/list',checkAuth,eventController.events_get_all);
router.get('/upcomingEvents',checkAuth,eventController.upcomingevents_get_all);

module.exports = router