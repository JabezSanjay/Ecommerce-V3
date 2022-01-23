const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const CustomError = require('../utils/customError');
const BigPromise = require('./bigPromise');

exports.isLoggedIn = BigPromise(async (req, res, next) => {
  const bearerToken = req.header('Authorization');
  let token = req.cookies.token;
  if (token === undefined) {
    bearerToken === undefined
      ? (token = undefined)
      : (token = req.header('Authorization').replace('Bearer ', ''));
  }
  if (!token) {
    return next(new CustomError('Login to get access!', 401, res));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

exports.customRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new CustomError('Access Denied!', 403, res));
    }
    next();
  };
};
