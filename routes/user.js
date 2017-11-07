var router = require('koa-router')()

var userController = require('../controllers/user')

router.post('/api/user/add', userController.addUser)
router.get('/api/users', userController.getAllUsers)
router.get('/api/users/search', userController.searchUsers)
router.delete('/api/user', userController.deleteUser)
router.post('/api/user', userController.updateUser)

module.exports = router
