const express = require('express');
const { test } = require('../controller/Product');
const { isLoggedIn, customRole } = require('../middleware/user');
const router = express.Router();
const cookieToken = require('../utils/cookieToken');

router.route('/product').get(test);

module.exports = router;
