import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category Name is required!'],
        unique: [true, 'This Category is already created!'],
        trim: true,
        index: true
    },
    isActive: {
        type: Boolean,
        enum: [true, false],
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

export default Category;