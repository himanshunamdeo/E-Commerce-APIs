import express, { Router } from "express"
import { addProduct, listProducts, removeProduct, productDetails } from "../controllers/ProductController.js"
import upload from "../middlewares/multer.js"

const productRouter = new express.Router()

productRouter.post("/add", upload.fields([{ name: "thumbnail", maxCount: 1 },
{ name: "productImages", maxCount: 10 }]), addProduct)

productRouter.get("/list", listProducts)
productRouter.post("/remove", removeProduct)
productRouter.get("/details", productDetails)

export default productRouter