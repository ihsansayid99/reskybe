const express = require('express')
const router = express.Router()

const {
    listImage
} = require('./controller')

router.get('/', listImage)

module.exports = router
