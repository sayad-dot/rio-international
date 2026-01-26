import prisma from '../../config/database.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import ApiError from '../../utils/ApiError.js';

/**
 * @desc    Get all reviews (including unapproved)
 * @route   GET /api/admin/reviews
 * @access  Private/Admin
 */
export const getAllReviews = asyncHandler(async (req, res) => {
  const { 
    status, 
    rating,
    search,
    page = 1, 
    limit = 20,
    sortBy = 'createdAt',
    order = 'desc'
  } = req.query;

  const where = {};
  
  if (status === 'approved') {
    where.isApproved = true;
  } else if (status === 'pending') {
    where.isApproved = false;
  }
  
  if (rating) {
    where.rating = parseInt(rating);
  }
  
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { comment: { contains: search, mode: 'insensitive' } },
      { users: {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } }
        ]
      }}
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  const [reviews, total] = await Promise.all([
    prisma.reviews.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy]: order },
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profileImage: true
          }
        },
        tours: {
          select: {
            id: true,
            title: true,
            destination: true,
            coverImage: true
          }
        }
      }
    }),
    prisma.reviews.count({ where })
  ]);

  res.json(
    new ApiResponse(200, {
      reviews,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    }, 'Reviews retrieved successfully')
  );
});

/**
 * @desc    Approve review
 * @route   PATCH /api/admin/reviews/:id/approve
 * @access  Private/Admin
 */
export const approveReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await prisma.reviews.update({
    where: { id },
    data: {
      isApproved: true,
      updatedAt: new Date()
    },
    include: {
      users: {
        select: {
          firstName: true,
          lastName: true
        }
      },
      tours: {
        select: {
          title: true
        }
      }
    }
  });

  // Update tour rating
  await updateTourRating(review.tourId);

  // Log activity
  await prisma.activity_logs.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      userId: req.user.id,
      action: 'APPROVE_REVIEW',
      entity: 'REVIEW',
      entityId: id,
      details: {
        tourTitle: review.tours.title,
        reviewer: `${review.users.firstName} ${review.users.lastName}`,
        rating: review.rating
      }
    }
  });

  res.json(new ApiResponse(200, review, 'Review approved successfully'));
});

/**
 * @desc    Reject/Unapprove review
 * @route   PATCH /api/admin/reviews/:id/reject
 * @access  Private/Admin
 */
export const rejectReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await prisma.reviews.update({
    where: { id },
    data: {
      isApproved: false,
      updatedAt: new Date()
    },
    include: {
      users: {
        select: {
          firstName: true,
          lastName: true
        }
      },
      tours: {
        select: {
          title: true
        }
      }
    }
  });

  // Update tour rating
  await updateTourRating(review.tourId);

  // Log activity
  await prisma.activity_logs.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      userId: req.user.id,
      action: 'REJECT_REVIEW',
      entity: 'REVIEW',
      entityId: id,
      details: {
        tourTitle: review.tours.title,
        reviewer: `${review.users.firstName} ${review.users.lastName}`
      }
    }
  });

  res.json(new ApiResponse(200, review, 'Review rejected successfully'));
});

/**
 * @desc    Delete review
 * @route   DELETE /api/admin/reviews/:id
 * @access  Private/Admin
 */
export const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await prisma.reviews.findUnique({
    where: { id },
    select: { 
      tourId: true,
      users: {
        select: {
          firstName: true,
          lastName: true
        }
      },
      tours: {
        select: {
          title: true
        }
      }
    }
  });

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  await prisma.reviews.delete({
    where: { id }
  });

  // Update tour rating
  await updateTourRating(review.tourId);

  // Log activity
  await prisma.activity_logs.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      userId: req.user.id,
      action: 'DELETE_REVIEW',
      entity: 'REVIEW',
      entityId: id,
      details: {
        tourTitle: review.tours.title,
        reviewer: `${review.users.firstName} ${review.users.lastName}`
      }
    }
  });

  res.json(new ApiResponse(200, null, 'Review deleted successfully'));
});

/**
 * Helper function to update tour rating
 */
async function updateTourRating(tourId) {
  const reviews = await prisma.reviews.findMany({
    where: {
      tourId,
      isApproved: true
    },
    select: {
      rating: true
    }
  });

  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
    : 0;

  await prisma.tours.update({
    where: { id: tourId },
    data: {
      rating: avgRating,
      totalReviews,
      updatedAt: new Date()
    }
  });
}
