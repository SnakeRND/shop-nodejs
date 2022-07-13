const {Type} = require('../models/models')
const ApiError = require('../errors/apiError')

class TypeController {
    async create(request, response) {
        const {name} = request.body
        const type = await Type.create({name})

        return response.json(type)
    }

    async getAll(request, response) {
        const type = await Type.findAll()

        return response.json(type)
    }
}

module.exports = new TypeController()
