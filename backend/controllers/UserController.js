const ApiError = require('../errors/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {
            id,
            email,
            role
        },
        process.env.SECRET_KEY,
        {
            expiresIn: process.env.TOKEN_LIFETIME
        }
    )
}

class UserController {
    async register(request, response, next) {
        const {email, password, role} = request.body
        if (!email || !password) {
            return next(ApiError.badRequest('Wrong email or password'))
        }

        const emailExist = await User.findOne({where: {email}})
        if (emailExist) {
            return next(ApiError.badRequest('Email already exist'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt()

        return response.json({token})
    }

    async login(request, response, next) {
        const {email, password} = request.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internalError('User not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internalError('Wrong password'))
        }
        const token = generateJwt(user.id, user.email, user.role)

        return response.json({token})
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
