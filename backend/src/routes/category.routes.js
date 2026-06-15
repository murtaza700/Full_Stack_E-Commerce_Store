import express from 'express';

import * as categoryController from '../controllers/category.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleChecker from '../middlewares/roleChecker.middleware.js';

const router = express.Router();

/* Admin Routes */
router.post('/', authMiddleware, roleChecker, categoryController.createCategory);
router.delete('/:id', authMiddleware, roleChecker, categoryController.deleteCategory);
router.patch('/:id', authMiddleware, roleChecker, categoryController.updateCategory);

/* Public Route */
router.get('/', categoryController.getAllCategories);

export default router;