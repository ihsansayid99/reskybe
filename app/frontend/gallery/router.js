const express = require('express')
const router = express.Router()
const {
    viewDetailGallery, viewGallery,
} = require('./controller')

router.get('/', viewGallery)
router.get('/:slug', viewDetailGallery)

module.exports = router