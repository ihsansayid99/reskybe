const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

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
    public_id: {
        type: String
    },
    image: {
        type: String,
        required: [true, 'Gambar Wajib Ada']
    }
}, {timestamps: true})

let categorySchema = mongoose.Schema({
    titleName: String,
    folderName: String,
    slug: {
        type: String,
        slug: 'folderName',
    },
    thumbnail: String,
    desc: String,
    category: {
        type: String,
        enum: ['portrait', 'wedding'],
        default: 'wedding',
        required: [true, 'Category Wajib Diisi']
    },
    photo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}]
})

const photoModel = mongoose.model('Photo', photoSchema);
const categoryModel = mongoose.model('Category', categorySchema);

module.exports = {
    photoModel,
    categoryModel
}