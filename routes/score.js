var router = require('koa-router')()

var scoreController = require('../controllers/score')

router.post('/api/score', scoreController.insertData)
router.get('/api/score', scoreController.findScores)

module.exports = router
