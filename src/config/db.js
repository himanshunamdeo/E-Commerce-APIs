const mongoose = require("mongoose")
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to DB")
    } catch (error) {
        console.error("Connection Failed", error)
        process.exit(1)        
    }
}

module.exports = connectDB