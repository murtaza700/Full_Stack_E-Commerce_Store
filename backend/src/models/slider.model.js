import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Slider heading/title is required fields.'],
        trim: true
    },
    subtitle: {
        type: String,
        trim: true
    },
    link: {
        type: String,
        trim: true,
        default: '/products'
    },
    image: {
        url: {
            type: String,
            required: true
        },
        fileId: {
            type: String,
            required: true
        }
    },
    orderPosition: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Slider = mongoose.model('slider', sliderSchema);

export default Slider;