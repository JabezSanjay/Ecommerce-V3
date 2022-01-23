const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, 'Please provide an address'],
    },
    city: {
      type: String,
      required: [true, 'Please provide a city'],
    },
    state: {
      type: String,
      required: [true, 'Please provide a state'],
    },
    country: {
      type: String,
      required: [true, 'Please provide a country'],
    },
    pincode: {
      type: String,
      required: [true, 'Please provide a pincode'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone'],
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user'],
  },
  paymentInfo: {
    paymentMethod: {
      type: String,
      required: [true, 'Please provide a payment method'],
      enum: ['COD', 'Stripe', 'Razorpay'],
    },
    paymentId: {
      type: String,
      required: [true, 'Please provide a payment id'],
    },
    amount: {
      type: Number,
      required: [true, 'Please provide an amount'],
    },
  },
  taxAmount: {
    type: Number,
    required: [true, 'Please provide a tax amount'],
  },
  shippingAmount: {
    type: Number,
    required: [true, 'Please provide a shipping amount'],
  },
  totalAmount: {
    type: Number,
    required: [true, 'Please provide a total amount'],
  },
  status: {
    type: String,
    default: 'Processing',
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
  },
  orderItems: [
    {
      name: {
        type: String,
        required: [true, 'Please provide a name'],
      },
      price: {
        type: Number,
        required: [true, 'Please provide a price'],
      },
      quantity: {
        type: Number,
        required: [true, 'Please provide a quantity'],
      },
      image: {
        type: String,
        required: [true, 'Please provide an image'],
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Please provide a product id'],
      },
    },
  ],
  deliveredAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Order', orderSchema);
