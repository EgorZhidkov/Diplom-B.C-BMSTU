const Router = require('express')
const router = new Router();
const controller = require('./statiscticController')
const { check } = require("express-validator")
const authMiddleware = require('../middlewaree/authMiddleware')
const roleMiddleware = require('../middlewaree/roleMiddleware')

router.post('/categoryStatistic', controller.getCategoryStatistic)
module.exports = router