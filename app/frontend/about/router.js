const express = require('express')
const router = express.Router()
const {
    viewAbout,
} = require('./controller')

router.get('/', viewAbout)

module.exports = router