const express = require('express');
const {
  createOrder,
  getOneOrder,
  getUserOrders,
  adminGetAllOrders,
  adminUpdateOrder,
  adminDeleteOrder,
} = require('../controller/Order');
const { isLoggedIn, customRole } = require('../middleware/user');
const router = express.Router();

//User routes
router.route('/create/order').post(isLoggedIn, createOrder);
router.route('/get/user/orders').get(isLoggedIn, getUserOrders);
router.route('/get/order/:id').get(isLoggedIn, getOneOrder);

//Admin routes
router
  .route('/get/all/orders')
  .get(isLoggedIn, customRole('admin'), adminGetAllOrders);
router
  .route('/update/order/:id')
  .put(isLoggedIn, customRole('admin'), adminUpdateOrder);
router
  .route('/delete/order/:id')
  .delete(isLoggedIn, customRole('admin'), adminDeleteOrder);

module.exports = router;
