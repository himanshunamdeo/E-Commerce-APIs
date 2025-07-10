import mongoose from "mongoose"
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "Ecommerce"
        })
        console.log("Connected to DB")
    } catch (error) {
        console.error("Connection Failed", error)
        process.exit(1)
    }
}

export default connectDB