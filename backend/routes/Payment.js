const express = require('express');
const {
  sendStripeKey,
  captureStripePayment,
} = require('../controller/Payment');
const { isLoggedIn, customRole } = require('../middleware/user');
const router = express.Router();

//Stripe routes
router.route('/get/stripe/key').get(sendStripeKey);
router.route('/create/stripe').post(isLoggedIn, captureStripePayment);

module.exports = router;
