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
            const { category } = req.body
            if(!req.file){
                console.log('Error : Image Kosong!')
                res.redirect('/')    
            } else {
                const image = req.file.path
                const photos = Photo({
                    category,
                    image
                })
                await photos.save();
                req.flash('alertMsg', 'Berhasil Tambah Gambar')
                req.flash('alertStatus', 'success')
                res.redirect('/')
            }
        } catch (error) {
            console.log('Error : ', error.message)
            res.redirect('/')
        }
    }
}