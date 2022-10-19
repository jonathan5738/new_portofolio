const mongoose = require('mongoose') 
const connectDB = async () => {
    try{
        const database = await mongoose.connect()
    } catch (err){
        console.log(err.message)
    }
}
connectDB()