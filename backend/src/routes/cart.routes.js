import express from 'express';

import * as cartController from '../controllers/cart.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, cartController.addToCart);
router.get('/', authMiddleware, cartController.getMyCart);
router.delete('/clear-all', authMiddleware, cartController.removeAllFromCart);
router.patch('/:id', authMiddleware, cartController.updateCartQuantity);
router.delete('/:id', authMiddleware, cartController.removeFromCart);

export default router;