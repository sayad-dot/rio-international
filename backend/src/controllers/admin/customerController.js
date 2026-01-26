import prisma from '../../config/database.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import ApiError from '../../utils/ApiError.js';

/**
 * @desc    Get all customers
 * @route   GET /api/admin/customers
 * @access  Private/Admin
 */
export const getAllCustomers = asyncHandler(async (req, res) => {
  const { 
    search,
    page = 1, 
    limit = 20,
    sortBy = 'createdAt',
    order = 'desc'
  } = req.query;

  const where = {
    role: 'CUSTOMER'
  };
  
  if (search) {
    where.OR = [
      { email: { contains: search, mode: 'insensitive' } },
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } },
      { phone: { contains: search, mode: 'insensitive' } }
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  const [customers, total] = await Promise.all([
    prisma.users.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy]: order },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        emailVerified: true,
        isActive: true,
        profileImage: true,
        nationality: true,
        loyaltyPoints: true,
        createdAt: true,
        _count: {
          select: {
            bookings: true,
            reviews: true
          }
        }
      }
    }),
    prisma.users.count({ where })
  ]);

  res.json(
    new ApiResponse(200, {
      customers,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    }, 'Customers retrieved successfully')
  );
});

/**
 * @desc    Get single customer details
 * @route   GET /api/admin/customers/:id
 * @access  Private/Admin
 */
export const getCustomerById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const customer = await prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      emailVerified: true,
      isActive: true,
      profileImage: true,
      dateOfBirth: true,
      nationality: true,
      passportNumber: true,
      loyaltyPoints: true,
      createdAt: true,
      updatedAt: true,
      bookings: {
        include: {
          tours: {
            select: {
              title: true,
              destination: true,
              coverImage: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      },
      reviews: {
        include: {
          tours: {
            select: {
              title: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      },
      wishlists: {
        include: {
          tours: {
            select: {
              id: true,
              title: true,
              destination: true,
              coverImage: true,
              price: true
            }
          }
        }
      }
    }
  });

  if (!customer) {
    throw new ApiError(404, 'Customer not found');
  }

  // Calculate total spending
  const totalSpent = customer.bookings.reduce((sum, booking) => {
    if (booking.paymentStatus === 'COMPLETED' || booking.paymentStatus === 'PARTIAL') {
      return sum + booking.paidAmount;
    }
    return sum;
  }, 0);

  res.json(new ApiResponse(200, { ...customer, totalSpent }, 'Customer retrieved successfully'));
});
