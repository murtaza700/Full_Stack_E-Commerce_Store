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
        url: {
            type: String,
            required: [true, 'Product Image URL is required!']
        },
        fileId: {
            type: String,
            required: [true, 'Product Image File ID is required!']
        }
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
    gender: {
        type: String,
        required: true,
        enum: ['unisex', 'men', 'women'],
        default: 'unisex'
    },
    ratings: {
        type: Number,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot be more than 5'],
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: [true, 'Please add a rating between 1 and 5'],
                min: 1,
                max: 5
            },
            comment: {
                type: String,
                required: [true, 'Please add a comment'],
                trim: true
            }
        }
    ],
    sku: {
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;