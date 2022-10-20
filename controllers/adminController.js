const Admin = require('../models/admin') 
const bcrypt = require('bcrypt')
const { formatAdminOutput } = require('../utils/formatAdminOutput')
const registerAdmin = async (req, res, next) => {
    const {username, first_name, last_name, email, password} = req.body
    try{
        const admin = await Admin.create({username, first_name, last_name, email, password})
        const token = await admin.generateAuthToken()
        return res.status(201).send(formatAdminOutput(admin._doc, token))
    } catch(err) {
        return res.status(400).send({ error: err.message })
    }
}
const loginAdmin = async (req, res, next) => {
    const {username, password} = req.body 
    try {
        const admin = await Admin.findUserByCredentials(username, password)
        const token = await admin.generateAuthToken()
        return res.status(200).send(formatAdminOutput(admin._doc, token))
    } catch(err) {
        return res.status(400).send({ error: err.message })
    }
}
const changePassword = async (req, res, next) => {
    const {oldPassword, newPassword, confirmPassword} = req.body 
    try {
        if(newPassword !== confirmPassword) {
            return res.status(400).send({error: 'both password must match'})
        } else {
            const ismatch =  await bcrypt.compare(oldPassword, req.admin.password)
            if(!ismatch) return res.status(400).send({error: 'unable to reset password, re-enter credentials'})
            const hashedPassword = await bcrypt.hash(newPassword, 12)
            await Admin.findByIdAndUpdate({_id: req.admin._id}, {password: hashedPassword}, {new: true})
            return res.status(200).send({message: 'user successfully updated'})
        }
    } catch(err) {
        return res.status(500).send({error: err.message})
    }
}
module.exports = { 
    registerAdmin, loginAdmin, changePassword
}