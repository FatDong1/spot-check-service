var router = require('koa-router')()

var workController = require('../controllers/work')

router.post('/api/work', workController.updateWork)
router.get('/api/work', workController.findWorkPage)
router.get('/api/work/expired', workController.findExpiredWork)
router.get('/api/work/unusual', workController.findUnusualWork)
router.post('/api/work/solve', workController.solveUnusualWork)

module.exports = router
