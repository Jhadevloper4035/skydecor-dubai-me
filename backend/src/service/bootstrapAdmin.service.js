import env from '../config/env.js';
import Admin from '../model/admin.model.js';
import logger from '../utils/logger.js';

export const bootstrapSuperAdmin = async () => {
  const { BOOTSTRAP_SUPERADMIN_EMAIL, BOOTSTRAP_SUPERADMIN_NAME, BOOTSTRAP_SUPERADMIN_PASSWORD } =
    env;

  if (!BOOTSTRAP_SUPERADMIN_EMAIL || !BOOTSTRAP_SUPERADMIN_PASSWORD) return;

  const existingAdmin = await Admin.findOne({ email: BOOTSTRAP_SUPERADMIN_EMAIL.toLowerCase() });

  if (existingAdmin) return;

  await Admin.create({
    name: BOOTSTRAP_SUPERADMIN_NAME || 'Super Admin',
    email: BOOTSTRAP_SUPERADMIN_EMAIL,
    password: BOOTSTRAP_SUPERADMIN_PASSWORD,
    role: 'superadmin',
  });

  logger.warn('Bootstrap superadmin created. Remove bootstrap credentials after first deploy.', {
    email: BOOTSTRAP_SUPERADMIN_EMAIL,
  });
};
