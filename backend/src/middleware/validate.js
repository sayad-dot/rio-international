import { validationResult } from 'express-validator';
import ApiError from '../utils/ApiError.js';

/**
 * Validate request based on express-validator rules
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    throw new ApiError(400, errorMessages.join(', '));
  }
  
  next();
};

/**
 * Validate registration data
 */
export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.push('Valid email is required');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (errors.length > 0) {
    throw new ApiError(400, errors.join(', '));
  }

  next();
};

/**
 * Validate login data
 */
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.push('Valid email is required');
  }

  if (!password || password.length === 0) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    throw new ApiError(400, errors.join(', '));
  }

  next();
};

export default validate;
