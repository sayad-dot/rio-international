import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/index.js';
import prisma from '../config/database.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Generate JWT Token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.expire,
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    throw new ApiError(400, 'Please provide name, email, and password');
  }

  if (password.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters long');
  }

  // Check if user already exists
  const existingUser = await prisma.users.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existingUser) {
    throw new ApiError(400, 'User with this email already exists');
  }

  // Split name into firstName and lastName
  const nameParts = name.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ') || nameParts[0];

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await prisma.users.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
      phone: phone || null,
      role: 'CUSTOMER',
      emailVerified: false,
      isActive: true,
      updatedAt: new Date(),
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true,
      emailVerified: true,
      profileImage: true,
      createdAt: true,
    },
  });

  // Generate token
  const token = generateToken(user.id);

  // Set cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: 'strict',
  });

  res.status(201).json(
    new ApiResponse(201, {
      user,
      token,
    }, 'User registered successfully')
  );
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    throw new ApiError(400, 'Please provide email and password');
  }

  // Find user
  const user = await prisma.users.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Check if user is active
  if (!user.isActive) {
    throw new ApiError(401, 'Your account has been deactivated');
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Generate token
  const token = generateToken(user.id);

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  // Set cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: 'strict',
  });

  res.json(
    new ApiResponse(200, {
      user: userWithoutPassword,
      token,
    }, 'Logged in successfully')
  );
});

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json(new ApiResponse(200, null, 'Logged out successfully'));
});

/**
 * @desc    Get current user
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res) => {
  const user = await prisma.users.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true,
      emailVerified: true,
      profileImage: true,
      dateOfBirth: true,
      nationality: true,
      passportNumber: true,
      loyaltyPoints: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.json(new ApiResponse(200, user, 'User retrieved successfully'));
});

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    dateOfBirth,
    nationality,
    passportNumber,
    profileImage,
  } = req.body;

  const updateData = {};

  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;
  if (phone) updateData.phone = phone;
  if (dateOfBirth) updateData.dateOfBirth = new Date(dateOfBirth);
  if (nationality) updateData.nationality = nationality;
  if (passportNumber) updateData.passportNumber = passportNumber;
  if (profileImage) updateData.profileImage = profileImage;

  updateData.updatedAt = new Date();

  const user = await prisma.users.update({
    where: { id: req.user.id },
    data: updateData,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true,
      emailVerified: true,
      profileImage: true,
      dateOfBirth: true,
      nationality: true,
      passportNumber: true,
      loyaltyPoints: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.json(new ApiResponse(200, user, 'Profile updated successfully'));
});

/**
 * @desc    Change password
 * @route   PUT /api/auth/change-password
 * @access  Private
 */
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, 'Please provide current and new password');
  }

  if (newPassword.length < 6) {
    throw new ApiError(400, 'New password must be at least 6 characters long');
  }

  // Get user with password
  const user = await prisma.users.findUnique({
    where: { id: req.user.id },
  });

  // Check current password
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Current password is incorrect');
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update password
  await prisma.users.update({
    where: { id: req.user.id },
    data: {
      password: hashedPassword,
      updatedAt: new Date(),
    },
  });

  res.json(new ApiResponse(200, null, 'Password changed successfully'));
});

/**
 * @desc    Verify email
 * @route   POST /api/auth/verify-email
 * @access  Private
 */
export const verifyEmail = asyncHandler(async (req, res) => {
  // In a real application, you would send a verification email
  // and verify the token here
  
  await prisma.users.update({
    where: { id: req.user.id },
    data: {
      emailVerified: true,
      updatedAt: new Date(),
    },
  });

  res.json(new ApiResponse(200, null, 'Email verified successfully'));
});

/**
 * @desc    Register a new admin/employee
 * @route   POST /api/auth/admin/register
 * @access  Public (but requires valid employee ID)
 */
export const adminRegister = asyncHandler(async (req, res) => {
  const { employeeId, firstName, lastName, email, phone, password } = req.body;

  // Validation
  if (!employeeId || !firstName || !lastName || !email || !password) {
    throw new ApiError(400, 'Please provide all required fields');
  }

  if (password.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters long');
  }

  // For now, we'll use a simple validation
  // In production, you would validate against a database of valid employee IDs
  // or an HR system API
  const validEmployeeIdPattern = /^EMP-\d{4}$/i;
  
  if (!validEmployeeIdPattern.test(employeeId)) {
    throw new ApiError(400, 'Invalid employee ID format. Must be EMP-XXXX');
  }

  // Check if user already exists
  const existingUser = await prisma.users.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existingUser) {
    throw new ApiError(400, 'User with this email already exists');
  }

  // Check if employee ID is already used (we'll store it in a custom field later)
  // For now, we'll proceed with registration

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create admin user
  const user = await prisma.users.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
      phone: phone || null,
      role: 'ADMIN', // Default role for employees
      emailVerified: false,
      isActive: true,
      updatedAt: new Date(),
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true,
      emailVerified: true,
      profileImage: true,
      createdAt: true,
    },
  });

  // Generate token
  const token = generateToken(user.id);

  // Set cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: 'strict',
  });

  res.status(201).json(
    new ApiResponse(201, {
      user,
      token,
    }, 'Admin account registered successfully')
  );
});
