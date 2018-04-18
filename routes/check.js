var router = require('koa-router')()

var checkController = require('../controllers/check')

router.post('/api/check', checkController.insertData)

module.exports = router
