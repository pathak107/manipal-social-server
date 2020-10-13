var express = require('express')
const chatController = require('../controllers/chatController')
const checkAuth = require('../middleware/check-auth');
var router = express.Router()


module.exports = router