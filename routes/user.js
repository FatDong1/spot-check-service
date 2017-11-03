var router = require('koa-router')()

var API = require('../config/api')
var userController = require('../controllers/user')

router.post(API.SIGNUP, userController.addUser)

module.exports = router
