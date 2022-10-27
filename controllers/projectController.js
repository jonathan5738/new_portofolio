const Category = require('../models/Category')
const Project = require('../models/Project') 

const addProject = async (req, res, next) => {
    const project_img = {url: req.file.path, filename: req.file.filename}
    let {
        description, category_id, technologies, name,
        website_url, github_url
    } = req.body
    github_url = JSON.parse(github_url)
    technologies = technologies.split(',')
    try{
        const category = await Category.findById({_id: category_id})
        if(!category) return res.status(404).send({error: 'unable to find category'})
        const project = new Project({
            description, category: category._id,
            website_url, github_url, name
        })
        project.technologies = technologies
        project.project_img = project_img 
        project.github_url = {client: github_url.client, backend: github_url.backend}
        await project.save()
        return res.status(201).send(project)
    } catch(err){
        return res.status(400).send({ error: err.message })
    }
}

const listProjects = async (req, res, next) => {
    try{
        const projects = await Project.find({})
        return res.status(200).send(projects)
    } catch(err){
        return res.status(500).send({ error: err.message })
    }
}
const listProjectPublic = async (req, res, next) => {
    const { category } = req.query
    const cate = await Category.findOne({name: category}).populate('projects')
    if(!cate) return res.status(404).send({error: 'error not found'})
    const projects = cate.projects 
    return res.status(200).send(projects)
}

const projectDetail = async (req, res, next) => {
    const {project_id} = req.params 
    try{
        const project = await Project.findById({_id: project_id})
        return res.status(200).send(project)
    } catch(err){
        return res.status(500).send({ error: err.message })
    }
}

const editProject = async (req, res, next) => {
    const {project_id} = req.params 
    let { name, description, technologies, website_url, github_url} = req.body
    technologies = technologies.split(',')
    github_url = JSON.parse(github_url)
    try {
        const project = await Project.findByIdAndUpdate({_id: project_id}, {name, description, technologies, website_url, github_url}, {new: true})
        return res.status(200).send(project)
    } catch(err){
        return res.status(404).send({ error: err.message })
    }
}
const deleteProject = async (req, res, next) => {
    const {project_id} = req.params 
    try{
        await Project.findByIdAndDelete({_id: project_id})
        return res.status(200).send({message: 'project successfully deleted'})
    } catch(err){
        return res.status(500).send({ error: err.message })
    }
}

module.exports = {
    addProject, listProjects, editProject,
     deleteProject, listProjectPublic, projectDetail, listAllProject
}