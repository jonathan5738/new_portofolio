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

app.use(cors())
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