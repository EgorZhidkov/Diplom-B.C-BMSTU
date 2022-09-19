const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema





const User = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    locked: { type: Boolean, required: true, default: false },
    roles: [{ type: String, ref: 'Role' }]
})
module.exports = mongoose.model('User', User)