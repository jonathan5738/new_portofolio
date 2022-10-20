const mongoose = require('mongoose') 
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')
const validator = require('validator') 


const adminSchema = mongoose.Schema({
    username: {type: String, required: true, trim: true},
    first_name: {type: String, required: true, trim: true},
    last_name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, validate(value){
        if(!validator.isEmail(value)) throw new Error('invalid email address')
    }},
    password: {type: String, required: true, trim: true}
})
adminSchema.pre('save', async function(){
    const user = this 
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 12)
    }
})
adminSchema.statics.findUserByCredentials = async (username, password) => {
    const user = await Admin.findOne({username})
    if(!user) throw new Error('username or password')
    const ismatch = await bcrypt.compare(password, user.password)
    if(!ismatch) throw new Error('username or password')
    return user
}
adminSchema.methods.generateAuthToken = async function(){
    const user = this 
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, {expiresIn: '7d'})
    return token 
}
const Admin = mongoose.model('Admin', adminSchema) 
module.exports = Admin