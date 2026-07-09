import express from 'express'
import multer from 'multer';

import * as sliderController from '../controllers/slider.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js';
import roleChecker from '../middlewares/roleChecker.middleware.js';

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});

// Public route
router.get('/', sliderController.getAllSliders);

// Admin routes
router.post('/', authMiddleware, roleChecker, upload.single('image'), sliderController.createSliderAdmin);
router.patch('/:id', authMiddleware, roleChecker, upload.single('image'), sliderController.updateSliderAdmin);
router.delete('/:id', authMiddleware, roleChecker, sliderController.deleteSliderAdmin);

export default router