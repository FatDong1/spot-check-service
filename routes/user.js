var router = require('koa-router')()

var userController = require('../controllers/user')

router.post('/api/user/add', userController.addUser)
router.get('/api/users', userController.getAllUsers)
router.post('/api/login', userController.checkUser)
router.delete('/api/user', userController.deleteUser)
router.post('/api/user', userController.updateUser)
router.get('/api/users/page', userController.findUserPage)

module.exports = router
