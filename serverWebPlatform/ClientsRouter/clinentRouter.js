const Router = require('express')
const router = new Router();
const controller = require('./clientController')
const { check } = require("express-validator")
const authMiddleware = require('../middlewaree/authMiddleware')
const roleMiddleware = require('../middlewaree/roleMiddleware')

router.post('/getAllClients', controller.getAllClients)
router.post('/getClientInfo', controller.getClientInfo)
router.post('/updateClientInfo', controller.updateClientInfo)

module.exports = router