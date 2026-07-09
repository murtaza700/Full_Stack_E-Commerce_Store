import express from 'express'
import multer, { memoryStorage } from 'multer';

import * as sliderController from '../controllers/slider.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js';
import roleChecker from '../middlewares/roleChecker.middleware.js';

const router = express.Router();

const upload = multer({
    storage: memoryStorage
});

// Public route
router.get('/', sliderController.getAllSliders);

// Admin routes
router.post('/', authMiddleware, roleChecker, sliderController.createSliderAdmin);
router.patch('/:id', authMiddleware, roleChecker, sliderController.updateSliderAdmin);
router.delete('/:id', authMiddleware, roleChecker, sliderController.deleteSliderAdmin);

export default router