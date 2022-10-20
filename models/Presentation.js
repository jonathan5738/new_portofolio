const mongoose = require('mongoose') 
const PresentationSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true},
    content: {type: String, required: true, trim: true},
    skills: [String]
})
const Presentation = mongoose.model('Presentation', PresentationSchema)
module.exports = Presentation