import bcryptjs from 'bcryptjs';

import User from '../models/user.model.js';
import tokenGenerator from '../utils/tokenGenerator.js';

export const signup = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        if (!fullName || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!'
            });
        }

        const isUserRepeated = await User.findOne({ email });

        if (isUserRepeated) {
            return res.status(409).json({
                success: false,
                message: 'User alreay registered!'
            });
        }

        const hashPass = await bcryptjs.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashPass,
            role
        });

        await newUser.save();

        const token = tokenGenerator({ id: newUser._id, role });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 3600000
        });

        return res.status(201).json({
            success: true,
            message: 'User Registered Successfully!',
            user: {
                id: newUser._id,
                name: newUser.fullName,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server Error!',
            error: err.message
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials!'
            });
        }

        const compPass = await bcryptjs.compare(password, user.password);

        if (!compPass) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials!'
            });
        }

        const token = tokenGenerator({ id: user._id, role: user.role });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 3600000
        });

        return res.status(200).json({
            success: true,
            message: 'User Logged In Successfully!',
            user: {
                id: user._id,
                name: user.fullName,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server Error!',
            error: err.message
        });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 0
        });

        return res.status(200).json({
            success: true,
            message: 'Logged out successfully!'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server Error!',
            error: err.message
        });
    }
}

export const getme = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server Error!',
            error: err.message
        });
    }
}