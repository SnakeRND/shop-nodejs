const {Brand} = require('../models/models')
const ApiError = require('../errors/apiError')

class BrandController {
    async create(request, response) {
        const {name} = request.body
        const type = await Brand.create({name})

        return response.json(type)
    }

    async getAll(request, response) {
        const brands = await Brand.findAll()

        return response.json(brands)
    }
}

module.exports = new BrandController()
