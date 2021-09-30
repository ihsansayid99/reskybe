const express = require('express')
const router = express.Router()

const multer = require('multer')
const fileStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'images')
    },
    filename: (req,file,cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})
const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const {
    viewIndex,
    actionUpload
} = require('./controller')

router.get('/', viewIndex)
router.post('/upload', multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'), actionUpload)

module.exports = router
