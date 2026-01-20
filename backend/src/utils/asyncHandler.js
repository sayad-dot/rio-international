/**
 * Higher order function to wrap async route handlers
 * Automatically catches errors and passes them to error middleware
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
