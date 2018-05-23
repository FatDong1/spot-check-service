var router = require('koa-router')()

var workController = require('../controllers/work')

router.post('/api/work', workController.updateWork)
router.get('/api/work', workController.findWorkPage)
router.get('/api/work/expired', workController.findExpiredWork)
router.get('/api/work/unusual', workController.findUnusualWork)
router.post('/api/work/solve', workController.solveUnusualWork)
router.get('/api/work/problem', workController.findProblemByChecker)
router.get('/api/work/today', workController.findTodayPercent)
router.get('/api/work/expired/person', workController.findExpiredWorkPerson)
router.get('/api/work/spot-check', workController.findWorkBySpid)
router.get('/api/work/number', workController.findWorkByChecker)

module.exports = router
