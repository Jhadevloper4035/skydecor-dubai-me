import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
=======
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 60,
>>>>>>> 3775944 (skydecor dubai final changes)
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
<<<<<<< HEAD
=======
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
>>>>>>> 3775944 (skydecor dubai final changes)
    role: {
      type: String,
      enum: ['admin', 'superadmin'],
      default: 'admin',
    },
<<<<<<< HEAD
    isActive: {
      type: Boolean,
      default: true,
=======
    isBlocked: {
      type: Boolean,
      default: false,
>>>>>>> 3775944 (skydecor dubai final changes)
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

<<<<<<< HEAD
adminSchema.index({ role: 1, isActive: 1 });
=======
adminSchema.index({ role: 1, isBlocked: 1 });
>>>>>>> 3775944 (skydecor dubai final changes)

adminSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

adminSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

adminSchema.methods.toSafeObject = function toSafeObject() {
  const admin = this.toObject();
  delete admin.password;
  return admin;
};

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
