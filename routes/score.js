var router = require('koa-router')()

var scoreController = require('../controllers/score')

router.post('/api/score', scoreController.insertData)

module.exports = router
