//setup express
const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

//Swagger setup
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookies and File middleware
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

//Morgan middleware
app.use(morgan('tiny'));

//Import all other routes
app.use('/api', require('./routes/User'));

module.exports = app;
