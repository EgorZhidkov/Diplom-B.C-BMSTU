const User = require('../models/User')

const getAllClients = async(req, res) => {
    try {
        const { offset, limit, filter } = req.body
        let request = {};
        if (offset === undefined || limit === undefined) {
            res.status(400).json({ error: "не указаны limit offset" })
        }
        if (filter) {
            if (filter.locked != undefined || filter.locked != null) {
                if (filter.locked != false) {
                    request.locked = filter.locked;
                }

            }
            if (filter.name != undefined || filter.name != null) {

                request.fullName = new RegExp(filter.name)
                console.log(request)
            }
            console.log(request.fullName)
            const UserSortLocked = await User.paginate(request, { offset: offset, limit: limit }).then((result) => {
                res.json({ resp: result, message: "sort locked user" })
            })
        } else {
            const UnsortUser = await User.paginate({}, { offset: offset, limit: limit }).then((result) => {
                res.json({ resp: result, message: "unsort user with offset, limit" })
            })
        }

    } catch (error) {
        return res.status(400).json({ error: error, message: "Не удалось получить список клиентов" })
    }
}
const updateClientInfo = async(req, res) => {
    try {
        const clientInfo = req.body
        console.log(clientInfo)
        const updateInfo = await User.findOneAndUpdate({ _id: clientInfo._id }, clientInfo)
        res.json({ message: "Информация о пользователе успешно изменена" })
    } catch (error) {
        return res.status(400).json({ error: error, message: "Не удалось обновить информацию о пользователе" })
    }
}
const getClientInfo = async(req, res) => {
    try {
        const { _id } = req.body
        const client = await User.findById({ _id })
        res.json({ resp: client })
    } catch (error) {
        return res.status(400).json({ error: error, message: "Не удалось получить информацию о клиенте" })
    }
}

module.exports = {
    getAllClients,
    getClientInfo,
    updateClientInfo
}