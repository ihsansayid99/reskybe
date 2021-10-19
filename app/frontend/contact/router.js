const express = require('express')
const router = express.Router()
const {
    viewContact,
} = require('./controller')

router.get('/', viewContact)

module.exports = router