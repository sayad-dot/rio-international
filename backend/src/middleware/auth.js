import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import prisma from '../config/database.js';

/**
 * Protect routes - verify JWT token
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in Authorization header or cookies
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized to access this route');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);
    console.log('🔐 Token decoded - User ID:', decoded.id);

    // Get user from database
    const user = await prisma.users.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
      },
    });

    if (!user) {
      console.log('❌ User not found in database for ID:', decoded.id);
      throw new ApiError(401, 'User not found');
    }

    if (!user.isActive) {
      console.log('❌ User account is deactivated:', user.email);
      throw new ApiError(401, 'User account is deactivated');
    }

    console.log('✅ User authenticated:', user.email, '| Role:', user.role);
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    throw new ApiError(401, 'Not authorized to access this route');
  }
});

/**
 * Authorize specific roles
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    console.log('=== AUTHORIZATION CHECK ===');
    console.log('User:', req.user?.email, '| ID:', req.user?.id);
    console.log('User Role:', req.user?.role);
    console.log('Required Roles:', roles);
    console.log('Has Access:', roles.includes(req.user?.role));
    
    if (!req.user) {
      console.log('❌ No user in request');
      throw new ApiError(403, 'User not authenticated');
    }
    
    if (!roles.includes(req.user.role)) {
      console.log(`❌ Access denied: User role '${req.user.role}' not in [${roles.join(', ')}]`);
      throw new ApiError(403, `Role ${req.user.role} is not authorized to access this route`);
    }
    
    console.log('✅ Authorization successful');
    next();
  };
};
