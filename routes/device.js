var router = require('koa-router')()

var deviceController = require('../controllers/device')

router.post('/api/device', deviceController.addDevice)

module.exports = router
