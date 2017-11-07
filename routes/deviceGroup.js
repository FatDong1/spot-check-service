var router = require('koa-router')()

var deviceGroupController = require('../controllers/deviceGroup')

router.post('/api/deviceGroup', deviceGroupController.addDeviceGroup)

module.exports = router
