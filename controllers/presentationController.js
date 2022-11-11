const Presentation = require('../models/Presentation') 

const createPresentation = async (req, res, next) => {
    const {title, content, skills} = req.body
    try{
        const presentation = new Presentation({title, content})
        presentation.skills = skills
        await presentation.save()
        return res.status(201).send(presentation)
    } catch(err){
        return res.status(400).send({ error: err.message })
    }
}
const fetchPresentation = async (req, res, next) => {
    try{
        const presentation = await Presentation.findOne({})
        return res.status(200).send(presentation)
    } catch(err){
        return res.status(500).send({ error: err.message })
    }
}
const editPresentation = async (req, res, next) => {
    const {presentation_id} = req.params 
    const allowedFields = ['title', 'content', 'skills']
    const receivedFields = Object.keys(req.body)
    const isvalid = receivedFields.every(field => allowedFields.includes(field))
    if(!isvalid) return res.status(400).send({error: 'invalid field sent'})
    const {title, content, skills} = req.body
    try{
        const presentation = await Presentation.findByIdAndUpdate({_id: presentation_id},
             {title, content, skills}, {new: true})
        return res.status(200).send(presentation)
    } catch(err){
        return res.status(400).send({error: err.message})
    }
}

const deletePresentation = async(req, res, next) => {
    const {presentation_id} = req.params 
    try{
        await Presentation.findByIdAndDelete({_id: presentation_id})
        return res.status(200).send({message: 'presentation successfully deleted'})
    } catch(err){
        return res.status(500).send({ error: err.message })
    }
}
module.exports = {
    editPresentation, deletePresentation, createPresentation, fetchPresentation
}