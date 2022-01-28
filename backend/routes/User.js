const express = require('express');
const {
  signup,
  signin,
  logout,
  forgotPassword,
  resetPassword,
  getLoggedInUserInfo,
  changePassword,
  updateUser,
  adminGetAllUsers,
  adminGetOneUser,
  adminEditOneUser,
  adminDeleteOneUser,
} = require('../controller/User');
const { isLoggedIn, customRole } = require('../middleware/user');
const router = express.Router();
const passport = require('passport');
const cookieToken = require('../utils/cookieToken');

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  (req, res) => {
    res.send('google');
  }
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    successMessage: 'User created successfully!',
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: process.env.CLIENT_URL,
  }),
  (req, res) => {
    cookieToken(req.user, res);
  }
);
router.route('/logout').get(logout);
router.route('/forgot-password').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);

router.route('/user/me').get(isLoggedIn, getLoggedInUserInfo);
router.route('/user/change-password').post(isLoggedIn, changePassword);
router.route('/user/update').post(isLoggedIn, updateUser);

router
  .route('/admin/users')
  .get(isLoggedIn, customRole('admin'), adminGetAllUsers);
router
  .route('/admin/user/:id')
  .get(isLoggedIn, customRole('admin'), adminGetOneUser)
  .put(isLoggedIn, customRole('admin'), adminEditOneUser)
  .delete(isLoggedIn, customRole('admin'), adminDeleteOneUser);

module.exports = router;
