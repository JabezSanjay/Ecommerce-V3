const Product = require('../models/Product');
const Order = require('../models/Order');
const BigPromise = require('../middleware/bigPromise');
const CustomError = require('../utils/customError');

exports.createOrder = BigPromise(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    taxAmount,
    shippingAmount,
    totalAmount,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    taxAmount,
    shippingAmount,
    totalAmount,
    status: 'Processing',
    user: req.user._id,
  });
  res.status(200).json({
    status: 'success',
    data: order,
  });
});

exports.getOneOrder = BigPromise(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (!order) {
    return next(new CustomError('Order not found!', 404, res));
  }
  res.status(200).json({
    status: 'success',
    data: order,
  });
});

exports.getUserOrders = BigPromise(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    return next(new CustomError('No orders found!', 404, res));
  }
  res.status(200).json({
    status: 'success',
    data: orders,
  });
});

exports.adminGetAllOrders = BigPromise(async (req, res, next) => {
  const orders = await Order.find();
  if (!orders) {
    return next(new CustomError('No orders found!', 404, res));
  }
  res.status(200).json({
    status: 'success',
    data: orders,
  });
});

exports.adminUpdateOrder = BigPromise(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    return next(new CustomError('Order not found!', 404, res));
  }
  if (order.status === 'Delivered') {
    return next(new CustomError('Order already delivered!', 401, res));
  }
  order.status = req.body.status;
  order.orderItems.forEach(async (orderItem) => {
    updateProductStock(orderItem.product, orderItem.quantity);
  });
  if (order.status === 'Delivered') {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    data: order,
  });
});

exports.adminDeleteOrder = BigPromise(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  await order.remove();
  res.status(200).json({
    status: 'success',
    message: 'Order deleted successfully!',
  });
});

async function updateProductStock(productId, quantity) {
  const product = await Product.findById(productId);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}
