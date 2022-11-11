const mongoose = require('mongoose') 
const projectSchema = mongoose.Schema({
    name: {type: String, required: true, trim: true},
    project_img: {url: String, filename: String},
    description: {type: String, required: true, trim: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    technologies: [String],
    website_url: {type: String, required: true},
    github_url: {client: String, backend: String}
}, {timestamps: true})

// projectSchema.virtual('category', {
//     ref: 'Category',
//     localField: 'category',
//     foreignField: '_id'
// })
const Project = mongoose.model('Project', projectSchema)
module.exports = Project