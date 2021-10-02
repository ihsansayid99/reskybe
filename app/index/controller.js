const Photo = require('./model')
const cloudinary = require('../../config/cloudinary')
const upload = require('../../config/upload')

module.exports = {
    viewIndex: async (req,res) => {
        try{
            const alertMessage = req.flash('alertMsg')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus};
            res.render('index', {
                alert
            })
        }catch(err){
            console.log(err.message)
        }
    },
    actionUpload: async(req,res) => {
        try {
            await upload(req,res)
            if(req.files.length <= 0){
                console.log('Error : Image Kosong!')
                req.flash('alertMsg', 'Gagal Upload Image Kosong')
                req.flash('alertStatus', 'danger')
                res.redirect('/')    
            } else {
                const files = req.files
                const { category, title, folder } = req.body
                for(const file of files){
                   await cloudinary.uploads(file.path, `resky/${folder}`).then(res => {
                       const photos = Photo({
                            category,
                            title,
                            image: res.url
                        })
                        console.log(res.url);
                        photos.save();
                   }).catch(err => {
                       req.flash('alertMsg', 'Gagal Upload Cloudinary')
                       req.flash('alertStatus', 'danger')
                       console.log('error catch cloudinary', err);
                   })
                }
                req.flash('alertMsg', 'Berhasil Tambah Gambar')
                req.flash('alertStatus', 'success')
                res.redirect('/')
            }
        } catch (error) {
            console.log('ErrorCatch: ', error.message)
            req.flash('alertMsg', 'Gagal Upload Try Catch')
            req.flash('alertStatus', 'danger')
            res.redirect('/')
        }
    }
}