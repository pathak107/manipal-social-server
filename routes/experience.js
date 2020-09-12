const express = require('express')
const router = express.Router();

//importing auth middleware
const checkAuth=require('../middleware/check-auth')

//importing controller
const expController=require('../controllers/experiencesController');

router.get('/list/:placeID',checkAuth,expController.exp_get_all);
router.post('/newExp/:placeID',checkAuth,expController.exp_create);
router.patch('/editExp/:expID',checkAuth,expController.exp_update);
router.delete('/deleteExp/:expID',checkAuth,expController.exp_delete_user);
router.patch('/updateLikes/:expID',checkAuth,expController.exp_update_likes);

module.exports = router