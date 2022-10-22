const express = require('express')
const router = express.Router()
const multer = require('multer')
const {storage} = require('../services/cloudinary') 
const config = multer({storage}) 
const isAdmin = require('../middlewares/isAdmin')
const { addProject, listProjects, deleteProject, editProject } = require('../controllers/projectController')


router.post('/new', config.single('project_img'), isAdmin, addProject)
router.get('/all', listProjects)
router.post('/:project_id/edit', isAdmin, editProject)
router.delete('/:project_id/delete', isAdmin, deleteProject)
module.exports = router