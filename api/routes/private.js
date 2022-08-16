const express = require('express')
const jwt = require('express-jwt')
const config = require('../config/config.json')

const Event = require('./private/Event')
const Medium = require('./private/Medium')
const Package = require('./private/Package')
const Trigger = require('./private/Trigger')
const Type = require('./private/Type')

const app = module.exports = express.Router()

const jwtCheck = jwt({
    secret: config.secret
})

//app.use('/api/private', jwtCheck)

app.use('/api/private/getAllTypes', Type.getAllTypes)
app.use('/api/private/getAllMediums', Medium.getAllMediums)
app.use('/api/private/getDefaultBlockPackages', Package.getDefaultBlockPackages)
app.use('/api/private/getDefaultTriggers', Trigger.getDefaultTriggers)
app.use('/api/private/createEvent', Event.createEvent)

app.use('/api/private/triggerEvent', Event.triggerEvent)