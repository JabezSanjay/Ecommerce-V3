const app = require('./app');
const connectWithDb = require('./config/db');
// const { connectWithRedis } = require('./config/redis');
require('dotenv').config();
const cloudinary = require('cloudinary');

//Database connection
connectWithDb();
// connectWithRedis();

//Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
