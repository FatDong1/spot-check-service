var router = require('koa-router')()

var workController = require('../controllers/work')

router.post('/api/work', workController.updateWork)
router.get('/api/work', workController.findWorkPage)
router.get('/api/work/expired', workController.findExpiredWork)
module.exports = router
