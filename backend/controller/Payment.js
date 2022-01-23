const BigPromise = require('../middleware/bigPromise');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Razorpay = require('razorpay');
const { nanoid } = require('nanoid');

exports.sendStripeKey = BigPromise(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

exports.captureStripePayment = BigPromise(async (req, res, next) => {
  const { amount } = req.body;
  const charge = await stripe.paymentIntents.create({
    amount,
    currency: 'inr',
    metadata: { integration_check: 'accept_a_payment' },
    receipt_email: req.user.email,
  });
  res.status(200).json({
    status: 'success',
    data: charge,
  });
});

exports.sendRazorpayKey = BigPromise(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: process.env.RAZORPAY_KEY_ID,
  });
});

exports.captureRazorpayPayment = BigPromise(async (req, res, next) => {
  let instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  const { amount } = req.body;
  const options = {
    amount,
    currency: 'INR',
    receipt: nanoid(),
  };
  const payment = await instance.orders.create(options);
  res.status(200).json({
    status: 'success',
    data: payment,
  });
});
