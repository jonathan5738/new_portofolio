const express = require('express')
const router = express.Router()
const multer = require('multer')
const {storage} = require('../services/cloudinary') 
const config = multer({storage}) 
const isAdmin = require('../middlewares/isAdmin')
const { addProject, listProjects, deleteProject,
     editProject, listProjectPublic, projectDetail } = require('../controllers/projectController')


router.get('/:project_id/detail', projectDetail)
router.post('/:project_id/edit', isAdmin, editProject) 
router.delete('/:project_id/delete', isAdmin, deleteProject)
router.get('/list', listProjectPublic)
router.get('/all', listProjects)
router.post('/new', config.single('project_img'), isAdmin, addProject)
module.exports = router