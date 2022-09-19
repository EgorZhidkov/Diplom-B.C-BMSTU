const TelegramContent = require('../models/TelegramContent')
const Categories = require('../models/Categories')
const User = require('../models/User');
const moment = require('moment');
const { upload } = require('../config')
const ObjectId = require('mongoose').Types.ObjectId;



const getOneNotation = async(req, res) => {
    try {
        const { _id } = req.body
        const record = await TelegramContent.findById({ _id })
        if (record) {
            res.json({ resp: record })
        }
        return res.status(400).json({ message: "Не удалось получить запись" })
    } catch (error) {
        return res.status(400).json({ message: "Не удалось получить запись" })
    }

}


const updateNotation = async(req, res) => {
    try {
        let { Notation } = req.body
        Notation.categories._id = ObjectId(Notation.categories._id)
        const model = await TelegramContent.findOneAndUpdate({ _id: Notation._id }, Notation)
        res.json({ message: Notation })
    } catch (error) {
        return res.status(400).json({ message: "Не удалось онбновить запись" })
    }

}


const createNewCategory = async(value) => {
    try {
        const isCategory = await Categories.findOne({ value: value })
        if (!isCategory) {
            const newCategory = new Categories({ value: value })
                // await newCategory.save()
            return newCategory
        }
    } catch (error) {
        return error
    }

}
const getAllCategories = async(req, res) => {
    try {
        const allCategories = await Categories.find({}, { __v: 0 })
        res.json({ resp: allCategories })
    } catch (error) {
        return res.status(400).json({ message: "Не удалось вернуть категории" })
    }

}
const deleteNotation = async(req, res) => {
    try {
        const { _id } = req.body
        console.log(_id)
        const deleteRecord = await TelegramContent.findByIdAndRemove({ _id: _id })
        return res.json({ message: "Маршрут был удален" })
    } catch (error) {
        res.status(400).json({ error: error, message: 'Не удалось удалить машрут' })
    }
}
const createNewRecord = async(req, res) => {
    try {
        const { id, name, active, url_link, category, description, imageName } = req.body
        if (id === null || name === null || url_link === null || category === null) {
            return res.status(400).json({ message: "Один из параметров не был задан" })
        }
        const record = await TelegramContent.findOne({ name })
        if (record) {
            return res.status(400).json({ message: "Маршрут с таким названием уже есть" })
        }
        const userCreated = await User.findById({ _id: id }).then((result) => {
            return result.fullName
        }).catch(() => {
            res.status(400).json({ message: 'Нет пользователя котроый создает новый маршрут' })
        })

        let categories = await Categories.findById({ _id: category._id })
            .then((result) => {
                return result
            })
            .catch((error) => {
                console.log("Ошибка")
            })
        if (!categories) {
            categories = await createNewCategory(category.value)
        }
        const dataCreated = moment().local().format()
        const tgContent = new TelegramContent({ name, active, dataCreated, description, url_link, categories, imageName, userCreated })
        await tgContent.save()
        await categories.save()
        return res.json({ message: "Новый маршрут был успешно добавлен" })
    } catch (error) {
        res.status(400).json({ error: error, message: 'Ошибка при создание новой записи' })
    }
}

const allRecordFromTelegramContent = async(req, res) => {
    try {

        const { offset, limit, filter } = req.body

        if (offset === null || offset === undefined) {
            const data = TelegramContent.paginate({}).then(result => {
                res.json(result)
            })
        } else {
            // const data = TelegramContent.paginate({ filter }, { offset: offset, limit: limit }).then(result => {
            //     res.json(result)
            // })
            let regexp = new RegExp(filter.name)
                // console.log(filter.name)
            const data = TelegramContent.paginate({ name: regexp }, { offset: offset, limit: limit }).then(async(result) => {
                result.docs = await Promise.all(result.docs.map(async(item) => {
                    item.categories = await Categories.findById({ _id: item.categories._id })
                    return item
                }))
                res.json(result)

            })


        }

    } catch (error) {
        return res.status(400).json({ error: error, message: "Не получилось забрать все записи" })
    }

}




module.exports = {
    createNewRecord,
    updateNotation,
    allRecordFromTelegramContent,
    getAllCategories,
    getOneNotation,
    deleteNotation
}