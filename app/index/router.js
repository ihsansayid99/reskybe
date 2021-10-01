const express = require('express')
const router = express.Router()
const {
    viewIndex,
    actionUpload
} = require('./controller')

router.get('/', viewIndex)
router.post('/upload', actionUpload)

module.exports = router
