const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

let photoSchema = mongoose.Schema({
    category: {
        type: String,
        enum: ['portrait', 'wedding', 'prewedding'],
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
    highlightTitle: String,
    client: String,
    date: Date,
    team: String,
    services: String,
    folderName: String,
    slug: {
        type: String,
        slug: 'folderName',
    },
    thumbnail: String,
    desc: String,
    category: {
        type: String,
        enum: ['portrait', 'wedding', 'prewedding'],
        default: 'wedding',
        required: [true, 'Category Wajib Diisi']
    },
    photo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}]
})

let homeSchema = mongoose.Schema({
    backgroundImage: String,
    title: String,
    subTitle: String,
    desc: String,
    buttonText: String,
    linkCampaign: String,
    public_id: String,
})

let quteSchema = mongoose.Schema({
    titleQute: String,
})

const photoModel = mongoose.model('Photo', photoSchema);
const categoryModel = mongoose.model('Category', categorySchema);
const homeModel = mongoose.model('Home', homeSchema)
const quteModel = mongoose.model('Qute', quteSchema)

module.exports = {
    photoModel,
    categoryModel,
    homeModel,
    quteModel
}