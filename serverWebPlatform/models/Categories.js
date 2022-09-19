const { Schema, model } = require('mongoose')

const Categories = new Schema({
    value: { type: String, unique: true },
    counter: { type: Number }
})

module.exports = model('Categories', Categories)