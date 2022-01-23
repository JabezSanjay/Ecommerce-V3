const express = require('express');
const {
  sendStripeKey,
  captureStripePayment,
  sendRazorpayKey,
  captureRazorpayPayment,
} = require('../controller/Payment');
const { isLoggedIn, customRole } = require('../middleware/user');
const router = express.Router();

//Stripe routes
router.route('/get/stripe/key').get(isLoggedIn, sendStripeKey);
router.route('/create/stripe').post(isLoggedIn, captureStripePayment);

//Razorpay routes
router.route('/get/razorpay/key').get(isLoggedIn, sendRazorpayKey);
router.route('/create/razorpay').post(isLoggedIn, captureRazorpayPayment);

module.exports = router;
