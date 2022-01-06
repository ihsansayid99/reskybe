const express = require('express')
const router = express.Router()

const {
    portofolio,
    homepages
} = require('./controller')

router.get('/portofolio', portofolio)
router.get('/homepages', homepages)

module.exports = router
