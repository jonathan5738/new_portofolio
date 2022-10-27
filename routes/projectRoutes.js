const express = require('express')
const router = express.Router()
const multer = require('multer')
const {storage} = require('../services/cloudinary') 
const config = multer({storage}) 
const isAdmin = require('../middlewares/isAdmin')
const { addProject, listProjects, deleteProject,
     editProject, listProjectPublic, projectDetail, listAllProject } = require('../controllers/projectController')


router.get('/:project_id/detail', projectDetail)
router.post('/:project_id/edit', isAdmin, editProject) 
router.delete('/:project_id/delete', isAdmin, deleteProject)

router.post('/new', config.single('project_img'), isAdmin, addProject)
router.get('/list', listAllProject)
router.get('/all', listProjects)
module.exports = router