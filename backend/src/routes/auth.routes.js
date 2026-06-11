import express from 'express';

import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/getme', authController.getme);

export default router;