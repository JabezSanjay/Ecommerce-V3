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

router.route('/signup').post(signup);
router.route('/signin').post(signin);
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
