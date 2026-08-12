import env from '../config/env.js';
import Admin from '../model/admin.model.js';
import logger from '../utils/logger.js';

export const bootstrapSuperAdmin = async () => {
<<<<<<< HEAD
  const { BOOTSTRAP_SUPERADMIN_EMAIL, BOOTSTRAP_SUPERADMIN_NAME, BOOTSTRAP_SUPERADMIN_PASSWORD } =
    env;
=======
  const {
    BOOTSTRAP_SUPERADMIN_EMAIL,
    BOOTSTRAP_SUPERADMIN_MOBILE,
    BOOTSTRAP_SUPERADMIN_NAME,
    BOOTSTRAP_SUPERADMIN_PASSWORD,
  } = env;
>>>>>>> 3775944 (skydecor dubai final changes)

  if (!BOOTSTRAP_SUPERADMIN_EMAIL || !BOOTSTRAP_SUPERADMIN_PASSWORD) return;

  try {
    const existingAdmin = await Admin.findOne({ email: BOOTSTRAP_SUPERADMIN_EMAIL.toLowerCase() });

    if (existingAdmin) return;

    await Admin.create({
<<<<<<< HEAD
      name: BOOTSTRAP_SUPERADMIN_NAME || 'Super Admin',
      email: BOOTSTRAP_SUPERADMIN_EMAIL,
      password: BOOTSTRAP_SUPERADMIN_PASSWORD,
=======
      fullName: BOOTSTRAP_SUPERADMIN_NAME || 'Super Admin',
      email: BOOTSTRAP_SUPERADMIN_EMAIL,
      password: BOOTSTRAP_SUPERADMIN_PASSWORD,
      mobileNumber: BOOTSTRAP_SUPERADMIN_MOBILE || '0000000000',
>>>>>>> 3775944 (skydecor dubai final changes)
      role: 'superadmin',
    });

    logger.warn('Bootstrap superadmin created. Remove bootstrap credentials after first deploy.', {
      email: BOOTSTRAP_SUPERADMIN_EMAIL,
    });
  } catch (err) {
    logger.error('Bootstrap superadmin failed. Continuing API startup.', {
      errorName: err?.name,
      errorMessage: err?.message,
      errorCode: err?.code,
      stack: err?.stack,
    });
  }
};
