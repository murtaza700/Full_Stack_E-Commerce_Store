import express from 'express';

import * as orderController from '../controllers/order.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleChecker from '../middlewares/roleChecker.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, orderController.createOrder);
router.get('/my-orders', authMiddleware, orderController.getMyAllOrders);
router.get('/my-orders/:id', authMiddleware, orderController.getMySingleOrder);

router.get('/admin/all-orders', authMiddleware, roleChecker, orderController.getAllOrdersAdmin);
router.delete('/admin/all-orders/:id', authMiddleware, roleChecker, orderController.deleteOrderAdmin);
router.patch('/admin/all-orders/:id', authMiddleware, roleChecker, orderController.updateOrderStatusAdmin);

export default router;