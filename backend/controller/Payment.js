const BigPromise = require('../middleware/bigPromise');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
