import express from 'express';

import * as orderController from '../controllers/order.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, orderController.createOrder);
router.get('/my-orders', authMiddleware, orderController.getMyAllOrders);
router.get('/my-orders/:id', authMiddleware, orderController.getMySingleOrder);

export default router;