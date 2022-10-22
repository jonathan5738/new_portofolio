const mongoose = require('mongoose') 
const projectSchema = mongoose.Schema({
    project_img: {url: String, filename: String},
    description: {type: String, required: true, trim: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    technologies: [String],
    website_url: {type: String, required: true},
    github_url: {client: String, backend: String}
}, {timestamps: true})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project