require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const {request} = require("express");

const PORT = process.env.PORT || 5090
const app = express()

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

app.use(cors())
app.use(express.json())
app.use('/api', router)

app.get('/', (request, response) => {
    response.status(200).json({message: 'It works'})
})

start()
