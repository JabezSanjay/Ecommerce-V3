//setup express
const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const passportConfig = require('./passport/passport');

//Swagger setup
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cookieSession = require('cookie-session');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookies and File middleware
app.use(
  cookieSession({
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

//Morgan middleware
app.use(morgan('tiny'));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Import all other routes
app.use('/api', require('./routes/User'));
app.use('/api', require('./routes/Product'));
app.use('/api', require('./routes/Payment'));
app.use('/api', require('./routes/Order'));

module.exports = app;
