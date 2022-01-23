const BigPromise = require('../middleware/bigPromise');
const Product = require('../models/Product');
const WhereClause = require('../utils/whereClause');
const cloudinary = require('cloudinary');

exports.createProduct = BigPromise(async (req, res, next) => {
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
      console.log('HERE');
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
    console.log('HERE 2', photos.public_id, photos.secure_url);
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
