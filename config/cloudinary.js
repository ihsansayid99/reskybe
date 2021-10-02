const cloudinary = require('cloudinary')
const config = require('./index')
//cloudinary
cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
})

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.secure_url,
                id: result.public_id,
            })
        }, {
            resource_type: "auto",
            folder: folder,
            use_filename: true
        })
    })
}