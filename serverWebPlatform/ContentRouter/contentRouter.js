const Router = require('express')
const router = new Router();
const controller = require('./contentController')
const { check } = require("express-validator")
const authMiddleware = require('../middlewaree/authMiddleware')
const roleMiddleware = require('../middlewaree/roleMiddleware')

router.post('/createNewRecord', controller.createNewRecord)
router.post('/getAllRecord', authMiddleware, controller.allRecordFromTelegramContent)
router.post('/getAllCategories', controller.getAllCategories)
router.post('/getOneNotation', controller.getOneNotation)
router.post('/updateNotation', controller.updateNotation)
router.post('/deleteNotation', controller.deleteNotation)
module.exports = router