import Admin from '../model/admin.model.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { verifyAdminToken } from '../utils/jwt.js';

const getBearerToken = (req) => {
  const header = req.get('Authorization') || '';
  if (!header.startsWith('Bearer ')) return null;
  return header.slice(7).trim();
};

export const requireAuth = catchAsync(async (req, _res, next) => {
  const token = getBearerToken(req);

  if (!token) {
    return next(new AppError('Authentication required.', 401, 'AUTH_REQUIRED'));
  }

  let payload;
  try {
    payload = verifyAdminToken(token);
  } catch {
    return next(new AppError('Invalid or expired token.', 401, 'INVALID_TOKEN'));
  }

  const admin = await Admin.findById(payload.sub).select('+password');

  if (!admin || !admin.isActive) {
    return next(new AppError('Admin account is not active.', 401, 'ADMIN_NOT_ACTIVE'));
  }

  req.admin = admin;
  return next();
});

export const authorize =
  (...roles) =>
  (req, _res, next) => {
    if (!req.admin) {
      return next(new AppError('Authentication required.', 401, 'AUTH_REQUIRED'));
    }

    if (!roles.includes(req.admin.role)) {
      return next(new AppError('You do not have permission for this action.', 403, 'FORBIDDEN'));
    }

    return next();
  };

export const requireAdmin = [requireAuth, authorize('admin', 'superadmin')];
export const requireSuperAdmin = [requireAuth, authorize('superadmin')];
