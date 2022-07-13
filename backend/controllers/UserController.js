const ApiError = require('../errors/apiError')
class UserController {
    async register(request, response) {

    }

    async login(request, response) {

    }

    async auth(request, response, next) {
        const {id} = request.query
        if (!id) {
            return next(ApiError.badRequest('ID is missing'))
        }
        response.json(id)
    }
}

module.exports = new UserController()
