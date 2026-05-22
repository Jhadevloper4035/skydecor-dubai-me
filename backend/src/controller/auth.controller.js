import Admin from '../model/admin.model.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { signAdminToken } from '../utils/jwt.js';
import { sendCreated, sendList, sendNoContent, sendSuccess } from '../utils/response.js';

const adminFields = ['name', 'email', 'password', 'role', 'isActive'];

const pickAdminFields = (body) =>
  adminFields.reduce((payload, field) => {
    if (body[field] !== undefined) payload[field] = body[field];
    return payload;
  }, {});

const sendAuthResponse = (res, admin, statusCode = 200) => {
  const token = signAdminToken(admin);

  sendSuccess(res, { token, admin: admin.toSafeObject() }, statusCode);
};

export const loginAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admin.findOne({ email: req.body.email.toLowerCase() }).select('+password');

  if (!admin || !(await admin.comparePassword(req.body.password))) {
    return next(new AppError('Invalid email or password.', 401, 'INVALID_CREDENTIALS'));
  }

  if (!admin.isActive) {
    return next(new AppError('Admin account is not active.', 401, 'ADMIN_NOT_ACTIVE'));
  }

  admin.lastLoginAt = new Date();
  await admin.save();

  return sendAuthResponse(res, admin);
});

export const getMe = catchAsync(async (req, res) => {
  sendSuccess(res, { admin: req.admin.toSafeObject() });
});

export const createAdmin = catchAsync(async (req, res) => {
  const admin = await Admin.create(pickAdminFields(req.body));
  sendCreated(res, { token: signAdminToken(admin), admin: admin.toSafeObject() });
});

export const getAdmins = catchAsync(async (_req, res) => {
  const admins = await Admin.find().sort({ createdAt: -1 });

  sendList(res, 'admins', admins);
});

export const updateAdmin = catchAsync(async (req, res, next) => {
  const payload = pickAdminFields(req.body);
  const admin = await Admin.findById(req.params.id).select('+password');

  if (!admin) {
    return next(new AppError('Admin not found.', 404, 'ADMIN_NOT_FOUND'));
  }

  Object.assign(admin, payload);
  await admin.save();

  sendSuccess(res, { admin: admin.toSafeObject() });
});

export const deleteAdmin = catchAsync(async (req, res, next) => {
  if (req.admin._id.toString() === req.params.id) {
    return next(
      new AppError('You cannot delete your own admin account.', 400, 'SELF_DELETE_DENIED'),
    );
  }

  const admin = await Admin.findByIdAndDelete(req.params.id);

  if (!admin) {
    return next(new AppError('Admin not found.', 404, 'ADMIN_NOT_FOUND'));
  }

  sendNoContent(res);
});
