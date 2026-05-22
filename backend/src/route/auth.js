import { Router } from 'express';

import {
  createAdmin,
  deleteAdmin,
  getAdmins,
  getMe,
  loginAdmin,
  updateAdmin,
} from '../controller/auth.controller.js';
import { requireAuth, requireSuperAdmin } from '../middleware/auth.js';
import { validate } from '../validator/index.js';
import {
  adminIdValidator,
  createAdminValidator,
  loginAdminValidator,
  updateAdminValidator,
} from '../validator/auth.validator.js';

const router = Router();

router.post('/login', loginAdminValidator, validate, loginAdmin);
router.get('/me', requireAuth, getMe);

router
  .route('/admins')
  .get(requireSuperAdmin, getAdmins)
  .post(requireSuperAdmin, createAdminValidator, validate, createAdmin);

router
  .route('/admins/:id')
  .patch(requireSuperAdmin, adminIdValidator, updateAdminValidator, validate, updateAdmin)
  .delete(requireSuperAdmin, adminIdValidator, validate, deleteAdmin);

export default router;
