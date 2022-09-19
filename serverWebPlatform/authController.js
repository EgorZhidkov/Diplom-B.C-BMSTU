const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const { secret } = require("./config");



const generateAccessToken = (id, roles, username, fullName, email, phone, locked) => {
    const payload = {
        id,
        roles,
        username,
        fullName,
        email,
        phone,
        locked
    }
    return jwt.sign(payload, secret, { expiresIn: "24h" })
}

const parseRole = (roles) => {
    let roleValue = []
    roles.forEach((item) => {
        roleValue.push(item._id)
    })
    return roleValue
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors })
            }
            const { username, password, fullName, email, phone, newRole, locked } = req.body;
            const candidate = await User.findOne({ username })
            if (candidate) {
                return res.status(400).json({ message: "Пользователь с таким именем уже существует" })
            }
            const hashPassword = bcrypt.hashSync(password, 7);

            const userRole = await Role.find({ _id: parseRole(newRole) })
            console.log(userRole)
            if (userRole === null) {
                return res.status(400).json({ message: "Не существует такой роли" })
            }

            const user = new User({ username, password: hashPassword, fullName, email, phone, locked, roles: userRole })
            await user.save()
            return res.json({ message: "Пользователь успешно зарегистрирован" })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Registration error' })
        }
    }
    async getAllRoles(req, res) {
        try {
            const roles = await Role.find({})
            res.json({ roles })
        } catch (error) {
            res.status(400).json({ message: 'Не удалось получить роли' })
        }
    }
    async login(req, res) {
        try {
            console.log(req.body)
            const { username, password } = req.body
            const user = await User.findOne({ username })
            if (!user) {
                return res.status(400).json({ message: `Пользователь ${username} не найден` })
            }
            if (user.locked === true) {
                return res.status(400).json({ message: `Пользователь ${username} заблокирован` })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: `Введен неверный пароль` })
            }
            const token = generateAccessToken(user._id, user.roles, user.username, user.fullName, user.email, user.phone)
            return res.json({ token })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Login error' })
        }
    }

    async getUsers(req, res) {
        try {
            // const userRole = new Role();
            // const adminRole = new Role({ value: "ADMIN" })
            // await userRole.save();
            // await adminRole.save();
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()