const express = require('express')
const router = express.Router()
const {
    viewIndex,
    actionUpload,
    actionDeleteFolder,
    viewHomeService,
    actionHomeSave,
    actionDeleteFolderHome,
} = require('./controller')

router.get('/', viewIndex)
router.post('/upload', actionUpload)
router.delete('/delete-folder/:id', actionDeleteFolder)

router.get('/homepages', viewHomeService)
router.post('/homepages', actionHomeSave)
router.delete('/homepages/delete-data/:id', actionDeleteFolderHome)

module.exports = router
