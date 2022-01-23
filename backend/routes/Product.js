const express = require('express');
const {
  adminCreateProduct,
  getProducts,
  getOneProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  createReview,
  deleteReview,
} = require('../controller/Product');
const { isLoggedIn, customRole } = require('../middleware/user');
const router = express.Router();
const cookieToken = require('../utils/cookieToken');

//Admin routes
router
  .route('/admin/create/product')
  .post(isLoggedIn, customRole('admin'), adminCreateProduct);

router
  .route('/admin/update/product/:id')
  .put(isLoggedIn, customRole('admin'), adminUpdateProduct);

router
  .route('/admin/delete/product/:id')
  .delete(isLoggedIn, customRole('admin'), adminDeleteProduct);

//User routes
router.route('/get/products').get(getProducts);
router.route('/get/product/:id').get(getOneProduct);
router.route('/create/product/review').post(isLoggedIn, createReview);
router.route('/delete/product/review/:id').delete(isLoggedIn, deleteReview);

module.exports = router;
