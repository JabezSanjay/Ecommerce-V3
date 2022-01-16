const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  googleId: String,
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    id: String,
    secureUrl: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'manager'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: false,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//encrypt password using bcrypt
//Hooks are functions that run before or after a certain action
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Validate the password
userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Create and return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

//Generate forgot password token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  //Getting a hash = make sure to get a hash on backend
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  //time of token expiry
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
