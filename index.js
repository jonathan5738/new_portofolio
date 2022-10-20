if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express') 
require('./db/mongoose')
const app = express() 
const cors = require('cors')
const PORT = process.env.PORT || 5000 
const adminRoutes = require('./routes/adminRoutes')

app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 


app.use('/admin', adminRoutes)
app.listen(PORT, () => console.log('server is listenning on port %s', PORT))