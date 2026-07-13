import express from 'express';

const roleChecker = (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: 'Access denied!'
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
        });
    }
}

export default roleChecker;