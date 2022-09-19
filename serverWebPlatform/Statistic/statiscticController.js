const TelegramContent = require('../models/TelegramContent')
const Categories = require('../models/Categories')
const User = require('../models/User');
const moment = require('moment');
const { upload } = require('../config')
const ObjectId = require('mongoose').Types.ObjectId;

const getCategoryStatistic = async(req, res) => {
    try {
        const categoryStat = await Categories.find({}, { __v: 0 }).sort({ counter: -1 })
        const labels = categoryStat.map(item => {
            return item.value
        })
        const counterCategories = categoryStat.map(item => {
            if (item.counter === null) {
                return 0
            }
            return item.counter
        })
        const colors = counterCategories.map(item => {
            return "#" + ((1 << 24) * Math.random() | 0).toString(16)
        })
        const content = await TelegramContent.find().sort({ counter: -1 }).limit(1)
        res.json({

            numbers: counterCategories,
            labels: labels,
            colors: colors,
            topTrain: content

        })
    } catch (error) {
        return res.status(400).json({ message: "Не удалось загрузить статистику" })
    }
}

module.exports = {
    getCategoryStatistic
}