import express from 'express'

import * as usersControllerAdmin from '../controllers/adminUsers.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js';
import roleChecker from '../middlewares/roleChecker.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, roleChecker, usersControllerAdmin.getAllUsersAdmin);
router.delete('/:id', authMiddleware, roleChecker, usersControllerAdmin.deleteUserAccountAdmin);

export default router;