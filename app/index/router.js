const express = require('express')
const router = express.Router()

const multer = require('multer')
const os = require('os')

const {
    viewIndex,
    actionUpload
} = require('./controller')

router.get('/', viewIndex)
router.post('/upload', multer({ dest: os.tmpdir() }).single('image'), actionUpload)

module.exports = router
