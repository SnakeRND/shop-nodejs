const Router = require('express')
const router = new Router
const userController = require('../controllers/UserController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/auth', userController.auth)

module.exports = router
