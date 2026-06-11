import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    }
})

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [orderItemsSchema],
    address: {
        type: String,
        required: [true, 'Your Address is required'],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'City name is required!']
    },
    postalCode: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Mobile Number is required!'],
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
        required: true
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;