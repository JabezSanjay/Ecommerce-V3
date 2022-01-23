class CustomError extends Error {
  constructor(message, statusCode, res) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
    res.send({
      success: false,
      statusCode: this.statusCode,
      message: this.message,
    });
  }
}

module.exports = CustomError;
