const config = require('../../config')
const path = require('path')
const Photo = require('./model')
const fs = require('fs')

module.exports = {
    viewIndex: async (req,res) => {
        try{
            const alertMessage = req.flash('alertMsg')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus };
            res.render('index', {
                alert
            })
        }catch(err){
            console.log(err.message)
        }
    },
    actionUpload: async(req,res) => {
        try {
            const { category, image } = req.body
            if(req.file){
                let tmp_path = req.file.path
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
                let fileName = req.file.originalname.split('.')[0] + '.' + originalExt
                let targetPath = path.resolve(config.rootPath, `public/upload/images/${fileName}`)
                
                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(targetPath)

                src.pipe(dest)
                src.on('end', async() => {
                    try {
                        const photos = Photo({
                            category,
                            image
                        })
                        await photos.save();
                        req.flash('alertMsg', 'Berhasil Tambah Gambar')
                        req.flash('alertStatus', 'success')
                        res.redirect('/')
                    } catch (error) {
                        req.flash('alertMsg', `${error.message}`)
                        req.flash('alertStatus', 'danger')
                        res.redirect('/')            
                    }
                })
            }
        } catch (error) {
            console.log('Error : ', error.message)
            res.redirect('/')
        }
    }
}