import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Name is required!'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unqiue: [true, 'Please Enter Another Email!'],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;