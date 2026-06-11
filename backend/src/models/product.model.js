import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Product Title is required!'],
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: [true, 'Product Description is required!'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Product Image is required!']
    },
    price: {
        type: Number,
        trim: true,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required!'],
    },
    stock: {
        type: Boolean,
        enum: [true, false],
        default: false,
        required: true
    },
    outOfStock: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    ratings: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        default: 0
    },
    sku: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;