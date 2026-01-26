import prisma from '../../config/database.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import ApiError from '../../utils/ApiError.js';

/**
 * @desc    Get all bookings (with filters)
 * @route   GET /api/admin/bookings
 * @access  Private/Admin
 */
export const getAllBookings = asyncHandler(async (req, res) => {
  const { 
    status, 
    paymentStatus, 
    search, 
    page = 1, 
    limit = 20,
    sortBy = 'createdAt',
    order = 'desc'
  } = req.query;

  // Build where clause
  const where = {};
  
  if (status) {
    where.bookingStatus = status;
  }
  
  if (paymentStatus) {
    where.paymentStatus = paymentStatus;
  }
  
  if (search) {
    where.OR = [
      { bookingReference: { contains: search, mode: 'insensitive' } },
      { users: { 
        OR: [
          { email: { contains: search, mode: 'insensitive' } },
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } }
        ]
      }}
    ];
  }

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  // Get bookings and total count
  const [bookings, total] = await Promise.all([
    prisma.bookings.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy]: order },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true
          }
        },
        tours: {
          select: {
            id: true,
            title: true,
            destination: true,
            coverImage: true,
            duration: true
          }
        }
      }
    }),
    prisma.bookings.count({ where })
  ]);

  res.json(
    new ApiResponse(200, {
      bookings,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    }, 'Bookings retrieved successfully')
  );
});

/**
 * @desc    Get single booking details
 * @route   GET /api/admin/bookings/:id
 * @access  Private/Admin
 */
export const getBookingById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await prisma.bookings.findUnique({
    where: { id },
    include: {
      users: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          nationality: true
        }
      },
      tours: true
    }
  });

  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  res.json(new ApiResponse(200, booking, 'Booking retrieved successfully'));
});

/**
 * @desc    Update booking status
 * @route   PATCH /api/admin/bookings/:id/status
 * @access  Private/Admin
 */
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];
  
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, 'Invalid booking status');
  }

  const booking = await prisma.bookings.update({
    where: { id },
    data: {
      bookingStatus: status,
      updatedAt: new Date()
    },
    include: {
      users: {
        select: {
          firstName: true,
          lastName: true,
          email: true
        }
      },
      tours: {
        select: {
          title: true
        }
      }
    }
  });

  // Log activity
  await prisma.activity_logs.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      userId: req.user.id,
      action: 'UPDATE_BOOKING_STATUS',
      entity: 'BOOKING',
      entityId: id,
      details: {
        oldStatus: booking.bookingStatus,
        newStatus: status,
        bookingReference: booking.bookingReference
      }
    }
  });

  res.json(new ApiResponse(200, booking, 'Booking status updated successfully'));
});

/**
 * @desc    Update payment status
 * @route   PATCH /api/admin/bookings/:id/payment
 * @access  Private/Admin
 */
export const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { paymentStatus, paidAmount, transactionId } = req.body;

  const validPaymentStatuses = ['PENDING', 'PARTIAL', 'COMPLETED', 'REFUNDED', 'FAILED'];
  
  if (!validPaymentStatuses.includes(paymentStatus)) {
    throw new ApiError(400, 'Invalid payment status');
  }

  const updateData = {
    paymentStatus,
    updatedAt: new Date()
  };

  if (paidAmount !== undefined) {
    updateData.paidAmount = parseFloat(paidAmount);
  }

  if (transactionId) {
    updateData.transactionId = transactionId;
  }

  const booking = await prisma.bookings.update({
    where: { id },
    data: updateData,
    include: {
      users: {
        select: {
          firstName: true,
          lastName: true,
          email: true
        }
      }
    }
  });

  // Log activity
  await prisma.activity_logs.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      userId: req.user.id,
      action: 'UPDATE_PAYMENT_STATUS',
      entity: 'BOOKING',
      entityId: id,
      details: {
        paymentStatus,
        paidAmount,
        transactionId,
        bookingReference: booking.bookingReference
      }
    }
  });

  res.json(new ApiResponse(200, booking, 'Payment status updated successfully'));
});

/**
 * @desc    Delete booking
 * @route   DELETE /api/admin/bookings/:id
 * @access  Private/Admin
 */
export const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await prisma.bookings.findUnique({
    where: { id },
    select: { bookingReference: true }
  });

  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  await prisma.bookings.delete({
    where: { id }
  });

  // Log activity
  await prisma.activity_logs.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      userId: req.user.id,
      action: 'DELETE_BOOKING',
      entity: 'BOOKING',
      entityId: id,
      details: {
        bookingReference: booking.bookingReference
      }
    }
  });

  res.json(new ApiResponse(200, null, 'Booking deleted successfully'));
});

/**
 * @desc    Export bookings to CSV
 * @route   GET /api/admin/bookings/export
 * @access  Private/Admin
 */
export const exportBookings = asyncHandler(async (req, res) => {
  const { status, paymentStatus, startDate, endDate } = req.query;

  const where = {};
  
  if (status) where.bookingStatus = status;
  if (paymentStatus) where.paymentStatus = paymentStatus;
  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) where.createdAt.gte = new Date(startDate);
    if (endDate) where.createdAt.lte = new Date(endDate);
  }

  const bookings = await prisma.bookings.findMany({
    where,
    include: {
      users: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          phone: true
        }
      },
      tours: {
        select: {
          title: true,
          destination: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // Convert to CSV format
  const csvHeader = 'Booking Reference,Customer Name,Email,Phone,Tour,Destination,Start Date,Travelers,Total Price,Booking Status,Payment Status,Created At\n';
  
  const csvRows = bookings.map(b => {
    const customerName = `${b.users.firstName} ${b.users.lastName}`;
    return [
      b.bookingReference,
      customerName,
      b.users.email,
      b.users.phone || '',
      b.tours.title,
      b.tours.destination,
      b.startDate.toISOString().split('T')[0],
      b.numberOfTravelers,
      b.totalPrice,
      b.bookingStatus,
      b.paymentStatus,
      b.createdAt.toISOString()
    ].join(',');
  }).join('\n');

  const csv = csvHeader + csvRows;

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=bookings.csv');
  res.send(csv);
});
