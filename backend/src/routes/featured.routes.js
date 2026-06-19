import express from 'express';

import authMiddleware from '../middlewares/auth.middleware.js';
import roleChecker from '../middlewares/roleChecker.middleware.js';
import * as featuredControllers from '../controllers/featured.controller.js';

const router = express.Router();

router.get('/', featuredControllers.getAllFeatured);
router.post('/toggle', authMiddleware, roleChecker, featuredControllers.toggleFeatured);

export default router;