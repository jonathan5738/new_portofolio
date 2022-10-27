const mongoose = require('mongoose') 
const categorySchema = mongoose.Schema({
    name: {type: String, required: true, unique: true, trim: true}
})
categorySchema.virtual('projects', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'category'
})
const Category = mongoose.model('Category', categorySchema)
module.exports = Category