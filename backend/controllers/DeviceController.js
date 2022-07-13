const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../errors/apiError')

class DeviceController {
    async create(request, response, next) {
        try {
            let {name, price, brandId, typeId, info} = request.body
            const {image} = request.files

            let fileName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'uploads', fileName))

            const device = await Device.create({name, price, brandId, typeId,image: fileName, info})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return response.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(request, response) {
        let {brandId, typeId, limit, page} = request.query
        let devices

        page = page || 1
        limit = limit || 9

        let offset = page * limit - limit

        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }

        return response.json(devices)
    }

    async getById(request, response) {
        const {id} = request.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )

        return response.json(device)
    }
}

module.exports = new DeviceController()
