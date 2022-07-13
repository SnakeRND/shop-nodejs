const Router = require('express')
const router = new Router
const deviceController = require('../controllers/DeviceController')

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getById)

module.exports = router
