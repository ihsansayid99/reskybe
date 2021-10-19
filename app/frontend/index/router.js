const express = require('express')
const router = express.Router()
const {
    viewFrontendIndex,
} = require('./controller')

router.get('/', viewFrontendIndex)

module.exports = router