const mongoose = require('mongoose')

let photoSchema = mongoose.Schema({
    category: {
        type: String,
        enum: ['portrait', 'wedding'],
        default: 'wedding',
        required: [true, 'Category Wajib Diisi']
    },
    image: {
        type: String,
    }
}, {timestamps: true})

module.exports = mongoose.model('Photo', photoSchema);