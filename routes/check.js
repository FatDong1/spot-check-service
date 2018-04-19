var router = require('koa-router')()

var checkController = require('../controllers/check')

router.post('/api/check', checkController.insertData)
router.get('/api/check', checkController.findcheckByDevice)

module.exports = router
