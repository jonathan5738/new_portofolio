const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const isAdmin = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1] 
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await Admin.findById({_id: decode._id})
        if(!admin) return res.status(404).send({error: 'admin not found'})
        if(!admin._id.equals(process.env.ADMIN_ID)) return res.status(403).send({error: 'unauthorized action'})
        req.admin = admin
        next()
    } catch(err) {
        return res.status(500).send({error: 'unable to authenticate'})
    }
}

module.exports = isAdmin