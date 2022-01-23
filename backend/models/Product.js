const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [50, 'Product name must be less than 50 characters'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    maxlength: [6, 'Price must be less than 6 characters'],
  },
  photos: [
    {
      id: {
        type: String,
        required: [true, 'Please provide a photo id'],
      },
      secureUrl: {
        type: String,
        required: [true, 'Please provide a photo secure url'],
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Leather', 'Linked', 'Smart'],
  },
  brand: {
    type: String,
    required: [true, 'Please provide a brand'],
  },
  stock: {
    type: Number,
    required: [true, 'Please provide a stock'],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user'],
      },
      comment: {
        type: String,
        required: [true, 'Please provide a comment'],
      },
      rating: {
        type: Number,
        required: [true, 'Please provide a rating'],
      },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user'],
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
