const express = require('express');
const {
  createProduct,
  getProducts,
  getOneProduct,
} = require('../controller/Product');
const { isLoggedIn, customRole } = require('../middleware/user');
const router = express.Router();
const cookieToken = require('../utils/cookieToken');

//Admin routes
router
  .route('/admin/create/product')
  .post(isLoggedIn, customRole('admin'), createProduct);

//User routes
router.route('/get/products').get(getProducts);
router.route('/get/product/:id').get(getOneProduct);

module.exports = router;
