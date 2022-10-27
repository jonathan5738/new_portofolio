if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express') 
require('./db/mongoose')
const app = express() 
const cors = require('cors')
const PORT = process.env.PORT || 5000 
const adminRoutes = require('./routes/adminRoutes')
const presentationRoutes = require('./routes/presentationRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const projectRoutes = require('./routes/projectRoutes')

var whitelist = [process.env.ALLOWED_CLIENT_URL]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
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
app.listen(PORT, () => console.log('server is listenning on port %s', PORT))