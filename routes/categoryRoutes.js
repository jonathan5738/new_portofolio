const express = require('express') 
const router = express.Router() 
const {
    createCategory, listCategory,
    editCategory, deleteCategory
} = require('../controllers/categoryController')
const isAdmin = require('../middlewares/isAdmin')

router.post('/new', isAdmin, createCategory)
router.get('/all', isAdmin, listCategory)
router.patch('/:category_id/edit', isAdmin, editCategory)
router.delete('/:category_id/delete', isAdmin, deleteCategory)

module.exports = router