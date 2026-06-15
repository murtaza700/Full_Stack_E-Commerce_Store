import express from 'express';
import multer, { memoryStorage } from 'multer';

import authMiddleware from '../middlewares/auth.middleware.js';
import roleChecker from '../middlewares/roleChecker.middleware.js';
import * as productController from '../controllers/product.controller.js';

const router = express.Router();

const upload = multer({
    storage: memoryStorage()
});

/* Admin Ruoutes */
router.post('/', authMiddleware, roleChecker, upload.single('image'), productController.createProduct);
router.patch('/:id', authMiddleware, roleChecker, upload.single('image'), productController.updateProduct);
router.delete('/:id', authMiddleware, roleChecker, productController.deleteProduct);

/* User Protected Routes */
router.post('/:id/reviews', authMiddleware, productController.createProductReview);

/* Public Route */
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchAndFilterProducts);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/:id', productController.getSingleProduct);

export default router;