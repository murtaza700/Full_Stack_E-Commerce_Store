import express from 'express';

import * as wishlistController from '../controllers/wishlist.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, wishlistController.getAllWishlist);
router.post('/toggle', authMiddleware, wishlistController.toggleWishlist);
router.delete('/clear-all', authMiddleware, wishlistController.clearWishlist);

export default router;