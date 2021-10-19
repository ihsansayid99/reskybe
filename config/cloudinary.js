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
                signature: result.signature
            })
        }, {
            resource_type: "auto",
            folder: folder,
            use_filename: true
        })
    })
}

exports.deletePhoto = (publicId) => {
    return cloudinary.v2.uploader.destroy(publicId, function(result){
        console.log("response delete photo : ", result);
    })
}

exports.deleteFolder = (folder) => {
    return new Promise(resolve => {
        cloudinary.api.delete_folder(folder, (result) => {
            resolve({
                message: "Berhasil Hapus"
            })
        })
    })
}