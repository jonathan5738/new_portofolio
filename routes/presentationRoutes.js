const express = require('express') 
const router = express.Router() 
const { 
    createPresentation, editPresentation,
    deletePresentation, fetchPresentation
} = require('../controllers/presentationController')
const isAdmin = require('../middlewares/isAdmin')

router.get('/detail', fetchPresentation)
router.post('/new', isAdmin, createPresentation)
router.patch('/:presentation_id/edit', isAdmin, editPresentation)
router.delete('/delete', isAdmin, deletePresentation)

module.exports = router