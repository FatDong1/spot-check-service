var router = require('koa-router')()

var deviceController = require('../controllers/device')

router.post('/api/device', deviceController.addDevice)
router.get('/api/devices', deviceController.findDevicePage)
router.get('/api/devices/dept', deviceController.findDeviceByDept)
router.get('/api/devices/name', deviceController.findDeviceByName)

module.exports = router
