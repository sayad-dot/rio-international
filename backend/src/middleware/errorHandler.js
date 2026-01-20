import ApiError from '../utils/ApiError.js';

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Handle Prisma errors
  if (err.code === 'P2002') {
    statusCode = 400;
    message = 'A record with this value already exists';
  }

  if (err.code === 'P2025') {
    statusCode = 404;
    message = 'Record not found';
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  }

  const response = {
    success: false,
    statusCode: statusCode || 500,
    message: message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  res.status(statusCode || 500).json(response);
};

/**
 * 404 Not Found middleware
 */
const notFound = (req, res, next) => {
  const error = new ApiError(404, `Route not found: ${req.originalUrl}`);
  next(error);
};

export { errorHandler, notFound };
