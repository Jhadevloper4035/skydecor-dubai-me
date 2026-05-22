import jwt from 'jsonwebtoken';

import env from '../config/env.js';

export const signAdminToken = (admin) =>
  jwt.sign(
    {
      sub: admin._id.toString(),
      role: admin.role,
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN,
    },
  );

export const verifyAdminToken = (token) => jwt.verify(token, env.JWT_SECRET);
