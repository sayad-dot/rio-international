import prisma from '../../config/database.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/admin/dashboard/stats
 * @access  Private/Admin
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
  // Get date ranges
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(today.getDate() - today.getDay());
  
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  // Parallel queries for better performance
  const [
    totalBookings,
    todayBookings,
    pendingBookings,
    confirmedBookings,
    totalRevenue,
    weekRevenue,
    monthRevenue,
    totalCustomers,
    newCustomersThisMonth,
    totalTours,
    activeTours,
    featuredTours,
    totalVisaPackages,
    popularVisaPackages,
    totalReviews,
    pendingReviews,
    recentBookings,
  ] = await Promise.all([
    // Total bookings
    prisma.bookings.count(),
    
    // Today's bookings
    prisma.bookings.count({
      where: {
        createdAt: { gte: today }
      }
    }),
    
    // Pending bookings
    prisma.bookings.count({
      where: {
        bookingStatus: 'PENDING'
      }
    }),
    
    // Confirmed bookings
    prisma.bookings.count({
      where: {
        bookingStatus: 'CONFIRMED'
      }
    }),
    
    // Total revenue
    prisma.bookings.aggregate({
      where: {
        paymentStatus: { in: ['COMPLETED', 'PARTIAL'] }
      },
      _sum: {
        totalPrice: true
      }
    }),
    
    // This week's revenue
    prisma.bookings.aggregate({
      where: {
        paymentStatus: { in: ['COMPLETED', 'PARTIAL'] },
        createdAt: { gte: thisWeekStart }
      },
      _sum: {
        totalPrice: true
      }
    }),
    
    // This month's revenue
    prisma.bookings.aggregate({
      where: {
        paymentStatus: { in: ['COMPLETED', 'PARTIAL'] },
        createdAt: { gte: thisMonthStart }
      },
      _sum: {
        totalPrice: true
      }
    }),
    
    // Total customers
    prisma.users.count({
      where: {
        role: 'CUSTOMER'
      }
    }),
    
    // New customers this month
    prisma.users.count({
      where: {
        role: 'CUSTOMER',
        createdAt: { gte: thisMonthStart }
      }
    }),
    
    // Total tours
    prisma.tours.count(),
    
    // Active tours
    prisma.tours.count({
      where: {
        isActive: true
      }
    }),
    
    // Featured tours
    prisma.tours.count({
      where: {
        isFeatured: true,
        isActive: true
      }
    }),
    
    // Total visa packages
    prisma.visa_packages.count(),
    
    // Popular visa packages
    prisma.visa_packages.count({
      where: {
        isPopular: true
      }
    }),
    
    // Total reviews
    prisma.reviews.count(),
    
    // Pending reviews
    prisma.reviews.count({
      where: {
        isApproved: false
      }
    }),
    
    // Recent bookings (last 5)
    prisma.bookings.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        bookingReference: true,
        totalPrice: true,
        bookingStatus: true,
        paymentStatus: true,
        createdAt: true,
        users: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        tours: {
          select: {
            title: true,
            destination: true
          }
        }
      }
    })
  ]);

  // Calculate week-over-week and month-over-month growth
  const stats = {
    bookings: {
      total: totalBookings,
      today: todayBookings,
      pending: pendingBookings,
      confirmed: confirmedBookings,
    },
    revenue: {
      total: totalRevenue._sum.totalPrice || 0,
      thisWeek: weekRevenue._sum.totalPrice || 0,
      thisMonth: monthRevenue._sum.totalPrice || 0,
    },
    customers: {
      total: totalCustomers,
      newThisMonth: newCustomersThisMonth,
    },
    tours: {
      total: totalTours,
      active: activeTours,
      featured: featuredTours,
    },
    visaPackages: {
      total: totalVisaPackages,
      popular: popularVisaPackages,
    },
    reviews: {
      total: totalReviews,
      pending: pendingReviews,
    },
    recentBookings,
  };

  res.json(new ApiResponse(200, stats, 'Dashboard statistics retrieved successfully'));
});

/**
 * @desc    Get booking trends for charts
 * @route   GET /api/admin/dashboard/trends
 * @access  Private/Admin
 */
export const getBookingTrends = asyncHandler(async (req, res) => {
  const { period = 'week' } = req.query; // week, month, year
  
  const now = new Date();
  let startDate;
  let groupBy;
  
  switch (period) {
    case 'year':
      startDate = new Date(now.getFullYear(), 0, 1);
      groupBy = 'month';
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      groupBy = 'day';
      break;
    case 'week':
    default:
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
      groupBy = 'day';
      break;
  }

  // Get bookings grouped by date
  const bookings = await prisma.bookings.findMany({
    where: {
      createdAt: { gte: startDate }
    },
    select: {
      createdAt: true,
      totalPrice: true,
      bookingStatus: true
    }
  });

  // Group bookings by date
  const trends = {};
  bookings.forEach(booking => {
    const date = booking.createdAt.toISOString().split('T')[0];
    if (!trends[date]) {
      trends[date] = {
        date,
        count: 0,
        revenue: 0,
        pending: 0,
        confirmed: 0,
        cancelled: 0
      };
    }
    trends[date].count++;
    trends[date].revenue += booking.totalPrice;
    trends[date][booking.bookingStatus.toLowerCase()]++;
  });

  const trendData = Object.values(trends).sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );

  res.json(new ApiResponse(200, trendData, 'Booking trends retrieved successfully'));
});

/**
 * @desc    Get popular destinations
 * @route   GET /api/admin/dashboard/popular-destinations
 * @access  Private/Admin
 */
export const getPopularDestinations = asyncHandler(async (req, res) => {
  const destinations = await prisma.bookings.groupBy({
    by: ['tourId'],
    _count: {
      id: true
    },
    _sum: {
      totalPrice: true
    },
    orderBy: {
      _count: {
        id: 'desc'
      }
    },
    take: 10
  });

  // Get tour details
  const tourIds = destinations.map(d => d.tourId);
  const tours = await prisma.tours.findMany({
    where: {
      id: { in: tourIds }
    },
    select: {
      id: true,
      title: true,
      destination: true,
      country: true,
      coverImage: true
    }
  });

  // Combine data
  const popularDestinations = destinations.map(dest => {
    const tour = tours.find(t => t.id === dest.tourId);
    return {
      tourId: dest.tourId,
      title: tour?.title,
      destination: tour?.destination,
      country: tour?.country,
      coverImage: tour?.coverImage,
      bookingsCount: dest._count.id,
      totalRevenue: dest._sum.totalPrice || 0
    };
  });

  res.json(new ApiResponse(200, popularDestinations, 'Popular destinations retrieved successfully'));
});
