const mongoose = require('mongoose')

let photoSchema = mongoose.Schema({
    category: {
        type: String,
        enum: ['portrait', 'wedding'],
        default: 'wedding',
        required: [true, 'Category Wajib Diisi']
    },
    title: {
        type: String,
        required: [true, 'Judul Folder Wajib diisi!']
    },
    image: {
        type: String,
        required: [true, 'Gambar Wajib Ada']
    }
}, {timestamps: true})

module.exports = mongoose.model('Photo', photoSchema);