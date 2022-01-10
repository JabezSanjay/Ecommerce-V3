const express = require('express');
const { signup } = require('../controller/User');
const router = express.Router();

router.route('/signup').post(signup);

module.exports = router;
