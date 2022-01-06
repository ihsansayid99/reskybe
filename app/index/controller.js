const { photoModel, categoryModel, quteModel, homeModel } = require('./model')
const cloudinary = require('../../config/cloudinary')
const upload = require('../../config/upload')

module.exports = {
    viewIndex: async (req,res) => {
        try{
            const alertMessage = req.flash('alertMsg')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus};
            const photos = await categoryModel.find({}).populate('photo');
            res.render('index', {
                alert,
                photos
            })
        }catch(err){
            console.log(err.message)
        }
    },
    viewHomeService: async (req,res) => {
        try{
            const alertMessage = req.flash('alertMsg')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus};
            const home = await homeModel.find({});
            res.render('home', {
                alert,
                home
            })
        }catch(err){
            console.log(err.message)
        }
    },
    actionHomeSave: async(req,res) => {
        try {
            await upload(req,res)
            if(req.files.length <= 0){
                console.log('Error : Image Kosong!')
                req.flash('alertMsg', 'Gagal Upload Image Kosong')
                req.flash('alertStatus', 'danger')
                res.redirect('/admin/homepages')    
            } else {
                const files = req.files
                const { title, subtitle, desc, btnText, campaignLink } = req.body
                for(const file of files){
                   await cloudinary.uploads(file.path, `resky/slider`).then(res => {
                        const homeModels = homeModel({
                            backgroundImage: res.url,
                            title,
                            subTitle: subtitle,
                            desc,
                            buttonText: btnText,
                            linkCampaign: campaignLink,
                            public_id: res.id
                        })
                        homeModels.save()
                        req.flash('alertMsg', 'Berhasil Tambah Data')
                        req.flash('alertStatus', 'success')
                    }).catch(err => {
                        req.flash('alertMsg', 'Gagal Upload Cloudinary')
                        req.flash('alertStatus', 'danger')
                        console.log('error catch cloudinary', err);
                    })
                }
            }
            res.redirect('/admin/homepages')
        } catch (error) {
            console.log('ErrorCatch: ', error.message)
            req.flash('alertMsg', 'Gagal Upload Try Catch')
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/homepages')
        }
    },
    actionUpload: async(req,res) => {
        try {
            await upload(req,res)
            if(req.files.length <= 0){
                console.log('Error : Image Kosong!')
                req.flash('alertMsg', 'Gagal Upload Image Kosong')
                req.flash('alertStatus', 'danger')
                res.redirect('/admin')    
            } else {
                const files = req.files
                const { category, title, folder, desc, hightlightTitle, client, dateProject,
                        team, services } = req.body
                let photoArray = []
                let thumbnail
                for(const file of files){
                   await cloudinary.uploads(file.path, `resky/${folder}`).then(res => {
                       const photos = photoModel({
                            category,
                            title,
                            public_id: res.id,
                            image: res.url
                        })
                        thumbnail = res.url
                        photos.save();
                        photoArray.push(photos._id)
                   }).catch(err => {
                       req.flash('alertMsg', 'Gagal Upload Cloudinary')
                       req.flash('alertStatus', 'danger')
                       console.log('error catch cloudinary', err);
                   })
                }
                const categoryModels = categoryModel({
                    titleName: title,
                    highlightTitle: hightlightTitle,
                    client,
                    date: dateProject,
                    team,
                    services,
                    folderName: folder,
                    thumbnail,
                    desc,
                    category,
                    photo: photoArray
                })
                categoryModels.save()
                req.flash('alertMsg', 'Berhasil Tambah Gambar')
                req.flash('alertStatus', 'success')
                res.redirect('/admin')
            }
        } catch (error) {
            console.log('ErrorCatch: ', error.message)
            req.flash('alertMsg', 'Gagal Upload Try Catch')
            req.flash('alertStatus', 'danger')
            res.redirect('/admin')
        }
    },
    actionDeleteFolder: async (req, res) => {
        try {
            const {id} = req.params
            const photos = await categoryModel.findOne({_id: id}).populate('photo')
            for(var photo of photos.photo){
                console.log("public id : ", photo.public_id);
                await cloudinary.deletePhoto(`${photo.public_id}`)
                await photoModel.findOneAndRemove({
                    _id: photo._id
                })
            }
            await cloudinary.deleteFolder(`resky/${photos.folderName}`).then(async (res) => {
                await categoryModel.findOneAndRemove({
                    _id: id
                })
                req.flash('alertMsg', res.message)
                req.flash('alertStatus', 'success')
            }).catch(err => {
                req.flash('alertMsg', err.message)
                req.flash('alertStatus', 'danger')
            }) 
            res.redirect('/admin')
        } catch (error) {
            console.log('ErrorCatch: ', error.message)
            req.flash('alertMsg', 'Gagal Upload Try Catch')
            req.flash('alertStatus', 'danger')
            res.redirect('/admin')
        }
    },
    actionDeleteFolderHome: async (req, res) => {
        try {
            const {id} = req.params
            const homes = await homeModel.findOne({_id: id})
            console.log("public id : ", homes.public_id);
            await cloudinary.deletePhoto(`${homes.public_id}`)
            await homeModel.findOneAndRemove({
                _id: id
            })
            req.flash('alertMsg', 'Berhasil Hapus Data!')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/homepages')
        } catch (error) {
            console.log('ErrorCatch: ', error.message)
            req.flash('alertMsg', 'Gagal Upload Try Catch')
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/homepages')
        }
    },
}