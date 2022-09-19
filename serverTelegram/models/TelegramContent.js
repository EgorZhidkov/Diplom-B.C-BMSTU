const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const TelegramContent = new Schema({
    name: { type: String, unique: true, required: true },
    active: { type: Boolean, unique: false, default: true, },
    dataCreated: { type: Date, unique: false, required: true },
    description: { type: String, unique: false, required: true },
    url_link: { type: String, unique: false, required: true },
    categories: { type: Object, required: true, unique: false, ref: "Categories" },
    imageName: { type: String },
    userCreated: {
        type: String,
        required: true,
        unique: false,
        ref: "User"
    },
    counter: { type: Number }
})
module.exports = model('TelegramContent', TelegramContent)