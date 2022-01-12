const User = require('../models/User');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');
const crypto = require('crypto');
const BigPromise = require('../middleware/bigPromise');
const cookieToken = require('../utils/cookieToken');
const CustomError = require('../utils/customError');
const mailHelper = require('../utils/emailHelper');

exports.signup = BigPromise(async (req, res, next) => {
  let photo;
  let newUser;
  if (req.files) {
    let file = req.files.photo;
    photo = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: 'users',
      width: 150,
      crop: 'scale',
    });
  }
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new CustomError('Name, email and password are required!', 400));
  }
  const user = await User.findOne({ email });
  if (user) {
    return next(new CustomError('User already exists', 400));
  }
  if (req.files) {
    newUser = await User.create({
      name,
      email,
      password,
      photo: {
        id: photo.public_id,
        secureUrl: photo.secure_url,
      },
    });
  } else {
    newUser = await User.create({
      name,
      email,
      password,
    });
  }
  cookieToken(newUser, res);
});

exports.signin = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomError('Please enter both Email and Password!', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new CustomError('User does not exists!', 404));
  }
  const isPasswordValid = await user.validatePassword(password);
  if (!isPasswordValid) {
    return next(new CustomError('Email and password does not match', 400));
  }
  cookieToken(user, res);
});

exports.logout = BigPromise(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: 'Logout successfully!',
  });
});

exports.forgotPassword = BigPromise(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError('User does not exists', 404));
  }
  const forgotPasswordToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const forgotPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/password/reset/${forgotPasswordToken}`;
  const message = `A unique link to reset your password has been generated for you. To reset your password, click the following link and follow the instructions.`;
  try {
    await mailHelper({
      email: email,
      subject: 'Password reset email',
      message: message,
      url: forgotPasswordUrl,
    });
    res.status(200).json({
      success: true,
      message: 'Check your email to reset password!',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new CustomError(error.message, 500));
  }
});

exports.resetPassword = BigPromise(async (req, res, next) => {
  const token = req.params.token;
  const { password, confirmPassword } = req.body;
  const encryptedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  const user = await User.findOne({
    encryptedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new CustomError('Token is invalid or expired!', 400));
  }
  if (password !== confirmPassword) {
    return next(
      new CustomError('Password and confirm password does not match!', 400)
    );
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangedAt = new Date();
  await user.save({ validateBeforeSave: false });
  cookieToken(user, res);
});
