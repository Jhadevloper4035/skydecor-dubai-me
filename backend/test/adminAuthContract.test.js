import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.resolve(__dirname, '../src');

const source = (filePath) => readFileSync(path.join(srcDir, filePath), 'utf8');

test('admin auth uses admin and superadmin model without OTP verification fields', () => {
  const adminModel = source('model/admin.model.js');
  const authController = source('controller/auth.controller.js');
  const authValidator = source('validator/auth.validator.js');
  const authMiddleware = source('middleware/auth.js');
  const combinedAuthSource = [adminModel, authController, authValidator, authMiddleware].join('\n');

  assert.match(adminModel, /fullName:/);
  assert.match(adminModel, /mobileNumber:/);
  assert.match(adminModel, /enum: \['admin', 'superadmin'\]/);
  assert.match(combinedAuthSource, /isBlocked/);
  assert.doesNotMatch(combinedAuthSource, /isEmailVerified|emailOtp|otp/i);
});
