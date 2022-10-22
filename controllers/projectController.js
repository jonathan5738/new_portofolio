const Project = require('../models/Project') 

const addProject = async (req, res, next) => {
    try{
        console.log(req.body)
        console.log(req.file)
    } catch(err){
        return res.status(400).send({ error: err.message })
    }
}

const listProjects = async (req, res, next) => {
    
}

const editProject = async (req, res, next) => {
    const {project_id} = req.params 
}
const deleteProject = async (req, res, next) => {
    const {project_id} = req.params 

}

module.exports = {
    addProject, listProjects, editProject, deleteProject
}