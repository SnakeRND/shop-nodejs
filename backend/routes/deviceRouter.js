const Router = require('express')
const router = new Router
const deviceController = require('../controllers/DeviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getById)

module.exports = router
