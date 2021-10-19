const express = require('express')
const router = express.Router()
const {
    viewIndex,
    actionUpload,
    actionDeleteFolder
} = require('./controller')

router.get('/', viewIndex)
router.post('/upload', actionUpload)
router.delete('/delete-folder/:id', actionDeleteFolder)


module.exports = router
