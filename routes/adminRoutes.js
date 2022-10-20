const express = require('express') 
const router = express.Router() 
const { registerAdmin, loginAdmin, changePassword } = require('../controllers/adminController')
const isAdmin = require('../middlewares/isAdmin')

router.post('/signin', registerAdmin) 
router.post('/login', loginAdmin)
router.patch('/change_password', isAdmin, changePassword) 

module.exports = router