const BigPromise = require('../middleware/bigPromise');
const Product = require('../models/Product');
const WhereClause = require('../utils/whereClause');
const cloudinary = require('cloudinary');
const CustomError = require('../utils/customError');

exports.adminCreateProduct = BigPromise(async (req, res, next) => {
  let photos;
  const imageArray = [];
  if (!req.files) {
    return next(new CustomError('Image is required!', 400, res));
  }

  if (req.files.photos.length) {
    for (let index = 0; index < req.files.photos.length; index++) {
      photos = await cloudinary.v2.uploader.upload(
        req.files.photos[index].tempFilePath,
        { folder: 'products' }
      );
      imageArray.push({
        id: photos.public_id,
        secureUrl: photos.secure_url,
      });
    }
  } else {
    photos = await cloudinary.v2.uploader.upload(
      req.files.photos.tempFilePath,
      { folder: 'products' }
    );
    imageArray.push({
      id: photos.public_id,
      secureUrl: photos.secure_url,
    });
  }
  req.body.photos = imageArray;
  req.body.createdBy = req.user.id;
  const createdProduct = await Product.create(req.body);
  res.status(200).json({
    status: 'success',
    data: createdProduct,
  });
});

exports.adminUpdateProduct = BigPromise(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  let imageArray = [];
  if (!product) {
    return next(new CustomError('Product not found!', 404, res));
  }
  if (req.files) {
    for (let index = 0; index < product.photos.length; index++) {
      await cloudinary.v2.uploader.destroy(product.photos[index].id);
    }
    if (req.files.photos.length) {
      for (let index = 0; index < req.files.photos.length; index++) {
        photos = await cloudinary.v2.uploader.upload(
          req.files.photos[index].tempFilePath,
          { folder: 'products' }
        );
        imageArray.push({
          id: photos.public_id,
          secureUrl: photos.secure_url,
        });
      }
    } else {
      photos = await cloudinary.v2.uploader.upload(
        req.files.photos.tempFilePath,
        { folder: 'products' }
      );
      imageArray.push({
        id: photos.public_id,
        secureUrl: photos.secure_url,
      });
    }
    req.body.photos = imageArray;
  }
  req.body.updatedBy = req.user.id;
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    status: 'success',
    data: updatedProduct,
  });
});

exports.adminDeleteProduct = BigPromise(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new CustomError('Product not found!', 404, res));
  }
  for (let index = 0; index < product.photos.length; index++) {
    await cloudinary.v2.uploader.destroy(product.photos[index].id);
  }
  await product.remove();
  res.status(200).json({
    status: 'success',
    message: 'Product deleted successfully!',
  });
});

exports.getProducts = BigPromise(async (req, res, next) => {
  const limit = req.query.limit || 10;
  let products = new WhereClause(Product.find(), req.query);
  products.search();
  products.filter();
  products.pager(limit);
  products = await products.base;
  res.status(200).json({
    status: 'success',
    data: products,
  });
});

exports.getOneProduct = BigPromise(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new CustomError('Product not found!', 404, res));
  }
  res.status(200).json({
    status: 'success',
    data: product,
  });
});

exports.createReview = BigPromise(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    comment: comment,
    rating: Number(rating),
  };
  const product = await Product.findById(productId);
  if (!product) {
    return next(new CustomError('Product not found!', 404, res));
  }
  const userAlreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );
  if (userAlreadyReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.rating = Number(rating);
        review.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }
  product.ratings =
    product.reviews.reduce((total, review) => total + review.rating, 0) /
    product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    message: 'Review added successfully!',
  });
});

exports.deleteReview = BigPromise(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new CustomError('Product not found!', 404, res));
  }
  const reviews = product.reviews.filter(
    (review) => review.user.toString() === req.user._id.toString()
  );
  let index = product.reviews.findIndex(
    (review) => review.user.toString() === req.user._id.toString()
  );
  if (index !== -1) reviews.splice(index, 1);
  const numberOfReviews = reviews.length;
  product.ratings =
    product.reviews.reduce((total, review) => total + review.rating, 0) /
    numberOfReviews;
  const ratings = product.ratings;
  await Product.findByIdAndUpdate(
    id,
    {
      reviews,
      numberOfReviews,
      ratings,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    status: 'success',
    message: 'Review deleted successfully!',
  });
});
