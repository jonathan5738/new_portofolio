if(process.env.NODE_ENV !== 'production') {
    process.env['NODE_ENV'] = 'development'
    require('dotenv').config({ path: `.${process.env.NODE_ENV}.env`})
}
const express = require('express')
const app = express() 
require('./db/mongoose')
const cors = require('cors')
const adminRoutes = require('./routes/adminRoutes')
const presentationRoutes = require('./routes/presentationRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const projectRoutes = require('./routes/projectRoutes')

// var whitelist = [process.env.ALLOWED_CLIENT_URL, process.env.ALLOWED_BACKEND_URL]
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
console.log(process.env.NODE_APP_NAME)
const corsOptions = {}
app.use(cors(corsOptions))
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

app.get('/', (req, res) => {
    return res.status(200).send({message: '*****welcome to this API*****'})
})
app.use('/admin', adminRoutes)
app.use('/presentation', presentationRoutes)
app.use('/category', categoryRoutes)
app.use('/projects', projectRoutes)

module.exports = app