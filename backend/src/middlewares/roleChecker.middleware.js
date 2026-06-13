import express from 'express';

const roleChecker = (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: 'This is for Admin!'
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}

export default roleChecker;