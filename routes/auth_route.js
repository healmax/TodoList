var express = require('express');
var router = express.Router();

var authController = require('../controllers/auth_controller.js');

router.post('/checkOAuthIDAvailable', authController.checkOAuth);

module.exports = router;