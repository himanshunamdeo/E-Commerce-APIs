import mongoose from mongoose;

const dimensionsSchema = new mongoose.Schema(
   {
      width: Number,
      height: Number,
      depth: Number
   }
)

const reviewSchema = new mongoose.Schema(
   {
      rating: { type: Number, require: true },
      comment: String,
      date: {
         type: Date,
         default: Date.now
      },
      reviewerName: { type: String, require: true },
      reviewerEmail: { type: String, require: true }
   }
)

const metaSchema = new mongoose.Schema(
   {
      createdAt: { type: Date, require: true },
      updatedAt: Date,
      barcode: { type: String, require: true },
      qrCode: { type: Date, require: true }
   }
)
const productSchema = new mongoose.Schema(
   {
      title: { type: String, require: true },
      description: { type: String, require: true },
      category: { type: String, require: true },
      price: { type: Number, require: true },
      discountPercentage: { type: Number, require: false },
      rating: { type: Number, require: true },
      stock: { type: Number, require: true },
      tags: [String],
      brand: String,
      sku: { type: String, require: true },
      weight: Number,
      dimensions: dimensionsSchema,
      warrantyInformation: String,
      shippingInformation: String,
      availabilityStatus: String,
      reviews: [reviewSchema],
      returnPolicy: String,
      minimumOrderQuantity: Number,
      meta: metaSchema,
      images: [String],
      thumbnail: String
   }
)

const productModel = mongoose.model("product", productSchema)

export default productModel