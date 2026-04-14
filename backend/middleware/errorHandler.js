const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    message: err.message || 'Server Error'
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
    response.error = err;
  }

  if (err.name === 'ValidationError') {
    response.message = 'Validation failed';
    response.errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message
    }));
    return res.status(400).json(response);
  }

  if (err.name === 'MongoServerError' && err.code === 11000) {
    response.message = 'Duplicate field value entered';
    return res.status(400).json(response);
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
