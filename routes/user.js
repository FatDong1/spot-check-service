var express = require('express');
var router = express.Router();

var API = require('../config/api');
var userController = require('../controllers/user');

router.post(API.LOGIN, userController.login);

module.exports = router;
