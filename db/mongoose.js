const mongoose = require('mongoose') 
const connectDB = async () => {
    try{
        const database = await mongoose.connect(process.env.MONGODB_URI)
        console.log('database connected on host %s', database.connection.host)
    } catch (err){
        console.log(err.message)
    }
}
connectDB()