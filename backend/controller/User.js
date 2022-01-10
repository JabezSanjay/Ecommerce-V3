const User = require('../models/User');
const BigPromise = require('../middleware/bigPromise');
const cookieToken = require('../utils/cookieToken');
const CustomError = require('../utils/customError');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');

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
