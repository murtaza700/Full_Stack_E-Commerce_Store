import express from 'express';

import * as categoryController from '../controllers/category.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleChecker from '../middlewares/roleChecker.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, roleChecker, categoryController.createCategory);

export default router;