const express = require('express');
const {
  signup,
  signin,
  logout,
  forgotPassword,
  resetPassword,
} = require('../controller/User');
const router = express.Router();

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/logout').get(logout);
router.route('/forgot-password').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);

module.exports = router;
