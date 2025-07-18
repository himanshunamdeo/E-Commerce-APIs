import productModel from "../models/Products/productModel.js"
import { v2 as cloudinary } from "cloudinary"

// Add Product
const addProduct = async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            price,
            discountPercentage,
            rating,
            stock,
            tags,
            brand,
            sku,
            weight,
            dimensions,
            warrantyInformation,
            shippingInformation,
            availabilityStatus,
            reviews,
            returnPolicy,
            minimumOrderQuantity,
            meta,
        } = req.body

        const imageFiles = []

        const { thumbnailURL, productImagesURL } = await getThumbnailANDProductImagesURLs(req.files)

        console.log("thumbnail: " + thumbnailURL + " \nprocductImagesURL: " + productImagesURL)
        const newProduct = new productModel(
            {
                title,
                description,
                category,
                price,
                discountPercentage,
                rating,
                stock,
                tags,
                brand,
                sku,
                weight,
                dimensions,
                warrantyInformation,
                shippingInformation,
                availabilityStatus,
                reviews,
                returnPolicy,
                minimumOrderQuantity,
                meta,
                images: productImagesURL,
                thumbnail: thumbnailURL
            }
        )

        const product = newProduct.save()


        res.json({ success: true, message: "Product created successfully." })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

async function getThumbnailANDProductImagesURLs(files) {
    let allFiles = []

    if (files.thumbnail && files.thumbnail.length > 0) {
        console.log(files.thumbnail)
        allFiles.push({ type: "thumbnail", file: files.thumbnail[0] })
    }

    if (files.productImages && files.productImages.length > 0) {
        files.productImages.forEach(element => {
            console.log(element)
            allFiles.push({ type: "productImage", file: element })
        });
    }

    let results = await Promise.all(
        allFiles.map(async ({ type, file }) => {
            try {
                const result = await cloudinary.uploader.upload(file.path, { resource_type: "image" })
                // console.log(url)
                return { type, url: result.secure_url }
            } catch (error) {
                console.log(error)
            }
        })
    )

    let thumbnailURL = null
    let productImagesURL = []

    results.forEach((result, index) => {
        const { type, url } = result

        if (type === "thumbnail") {
            thumbnailURL = url
        } else {
            productImagesURL.push(url)
        }
    })

    return { thumbnailURL: thumbnailURL, productImagesURL: productImagesURL }

}

// List Products
const listProducts = async (req, res) => {

}

// Remove Product
const removeProduct = async (req, res) => {

}

// Product Details
const productDetails = async (req, res) => {

}

export { addProduct, listProducts, removeProduct, productDetails }