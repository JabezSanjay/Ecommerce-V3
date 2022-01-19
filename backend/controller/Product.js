const BigPromise = require('../middleware/bigPromise');

exports.test = BigPromise(async (req, res, next) => {
  res.status(200).json({
    success: true,
  });
});
