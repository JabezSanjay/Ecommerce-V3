const User = require('../models/User');
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
    return next(
      new CustomError('Name, email and password are required!', 400, res)
    );
  }
  const user = await User.findOne({ email });
  if (user) {
    return next(new CustomError('User already exists', 400, res));
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
    return next(
      new CustomError('Please enter both Email and Password!', 400, res)
    );
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new CustomError('User does not exists!', 404, res));
  }
  if (user.googleId) {
    return next(new CustomError('User is registered with Google!', 400, res));
  }
  const isPasswordValid = await user.validatePassword(password);
  if (!isPasswordValid) {
    return next(new CustomError('Email and password does not match', 400, res));
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
    return next(new CustomError('User does not exists', 404, res));
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
    return next(new CustomError(error.message, 500, res));
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
    return next(new CustomError('Token is invalid or expired!', 400, res));
  }
  if (password !== confirmPassword) {
    return next(
      new CustomError('Password and confirm password does not match!', 400, res)
    );
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangedAt = new Date();
  await user.save({ validateBeforeSave: false });
  cookieToken(user, res);
});

exports.getLoggedInUserInfo = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.changePassword = BigPromise(async (req, res, next) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(userId).select('+password');
  const isOldPasswordValid = await user.validatePassword(oldPassword);
  if (!isOldPasswordValid) {
    return next(new CustomError('Incorrect password!', 400, res));
  }
  user.password = newPassword;
  user.passwordChangedAt = new Date();
  await user.save({ validateBeforeSave: false });
  cookieToken(user, res);
});

exports.updateUser = BigPromise(async (req, res, next) => {
  const { name } = req.body;
  const updatedData = {
    name: name,
  };
  if (req.files) {
    const user = await User.findById(req.user.id);
    await cloudinary.v2.uploader.destroy(user.photo.id);
    const updatedPhoto = await cloudinary.v2.uploader.upload(
      req.files.photo.tempFilePath,
      {
        folder: 'users',
        width: 150,
        crop: 'scale',
      }
    );
    updatedData.photo = {
      id: updatedPhoto.public_id,
      secureUrl: updatedPhoto.secure_url,
    };
  }
  await User.findByIdAndUpdate(req.user.id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: 'User updated successfully!',
  });
});

exports.adminGetAllUsers = BigPromise(async (req, res, next) => {
  let users = await User.find();
  res.status(200).json({
    success: true,
    data: users,
  });
});

exports.adminGetOneUser = BigPromise(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new CustomError('User not found!', 404, res));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.adminEditOneUser = BigPromise(async (req, res, next) => {
  const { name, role } = req.body;
  const updatedData = {
    name: name,
    role: role,
  };
  await User.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: 'User updated successfully!',
  });
});

exports.adminDeleteOneUser = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new CustomError('User not found!', 404, res));
  }
  await cloudinary.v2.uploader.destroy(user.photo.id);
  await user.remove();
  res.status(200).json({
    success: true,
    message: 'User deleted successfully!',
  });
});
