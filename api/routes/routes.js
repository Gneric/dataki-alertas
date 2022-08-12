const { Router } = require('express')
const router = Router()
const config = require('./config.js')
const fetch = require('node-fetch')
const sql = require("mssql");

const { 
    getAllTypes, 
    getAllMediums, 
    getDefaultPackages, 
    getDefaultTriggers, 
    createEvent, 
    createEventMediums 
} = require('../utils/mySQL/mySQLConn')

router.get('/', (req, res) => {
    const response = {
        codigo: 200,
        mensaje: 'Router test'
       };
    res.send(response);
});

// TYPES
router.post('/api/getAllTypes', async (req, res) => {
    const response = await getAllTypes()
    res.status(response.status_code).send(response.msg)
});

// MEDIUMS
router.post('/api/getAllMediums', async (req, res) => {
    const response = await getAllMediums()
    res.status(response.status_code).send(response.msg)
});

// BLOCK PACKAGES
router.post('/api/getDefaultBlockPackages', async (req, res) => {
    const response = await getDefaultPackages()
    res.status(response.status_code).send(response.msg)
});

// TRIGGERS
router.post('/api/getDefaultTriggers', async (req, res) => {
    const response = await getDefaultTriggers()
    res.status(response.status_code).send(response.msg)
});

// EVENT
router.post('/api/createEvent', async (req, res) => {
    const { name, recipients, creator } = req.body.data;
    const { type, mediums, blockPackage, trigger } = req.body.data;
    let created_At = Date.now()
    let updated_At = created_At

    const response = await createEvent(name, type, trigger, recipients, blockPackage, creator, created_At, updated_At)
    const res_mediumns = await createEventMediums(mediums)
});

