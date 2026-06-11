import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
    try {

        const JWT_SECRET = process.env.JWT_SECRET;

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access: No token found!'
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access: Invalid token signature!'
            });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Authentication failed: User no longer exists!'
            });
        }

        req.user = user;

        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Session expired: Please log in again!'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server security validation error!'
        });
    }

}

export default authMiddleware;