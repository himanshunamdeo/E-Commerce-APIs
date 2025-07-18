import app from "./app.js"
import dotenv from "dotenv"
import userRouter from "./routes/userRoute.js"
import connectDB from "./config/db.js"
import productRouter from "./routes/ProductRoute.js"
import connectCloudinary from "./cloudinary.js"

dotenv.config()

const port = process.env.PORT

app.listen(port, () => {
    console.log("Server is up and running on port" + port)
})

try {
    connectDB()
    connectCloudinary()
} catch (error) {
    console.log(error.mssage)
}

app.use("/api/user", userRouter)
app.use("/api/product", productRouter)

app.get("/", (req, res) => {
    res.send("API working now")
})