import prisma from '../../config/database.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import ApiError from '../../utils/ApiError.js';

/**
 * @desc    Get all tours (including inactive for admin)
 * @route   GET /api/admin/tours
 * @access  Private/Admin
 */
export const getAllToursAdmin = asyncHandler(async (req, res) => {
  const { 
    category, 
    country, 
    isActive,
    isFeatured,
    search,
    page = 1, 
    limit = 20,
    sortBy = 'createdAt',
    order = 'desc'
  } = req.query;

  const where = {};
  
  if (category) where.category = category;
  if (country) where.country = { contains: country, mode: 'insensitive' };
  if (isActive !== undefined) where.isActive = isActive === 'true';
  if (isFeatured !== undefined) where.isFeatured = isFeatured === 'true';
  
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { destination: { contains: search, mode: 'insensitive' } },
      { country: { contains: search, mode: 'insensitive' } }
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  const [tours, total] = await Promise.all([
    prisma.tours.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy]: order },
      include: {
        _count: {
          select: {
            bookings: true,
            reviews: true
          }
        }
      }
    }),
    prisma.tours.count({ where })
  ]);

  res.json(
    new ApiResponse(200, {
      tours,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    }, 'Tours retrieved successfully')
  );
});

/**
 * @desc    Create new tour
 * @route   POST /api/admin/tours
 * @access  Private/Admin
 */
export const createTour = asyncHandler(async (req, res) => {
  const {
    title,
    slug,
    description,
    shortDescription,
    destination,
    country,
    category,
    duration,
    price,
    discountPrice,
    maxGroupSize,
    difficulty,
    inclusions,
    exclusions,
    itinerary,
    highlights,
    coverImage,
    images,
    isFeatured,
    isHajjUmrah,
    metaTitle,
    metaDescription
  } = req.body;

  // Check if slug already exists
  const existingTour = await prisma.tours.findUnique({
    where: { slug }
  });

  if (existingTour) {
    throw new ApiError(400, 'A tour with this slug already exists');
  }

  const tour = await prisma.tours.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      title,
      slug,
      description,
      shortDescription,
      destination,
      country,
      category,
      duration: parseInt(duration),
      price: parseFloat(price),
      discountPrice: discountPrice ? parseFloat(discountPrice) : null,
      maxGroupSize: parseInt(maxGroupSize) || 10,
      difficulty: difficulty || 'MODERATE',
      inclusions: inclusions || [],
      exclusions: exclusions || [],
      itinerary: itinerary || {},
      highlights: highlights || [],
      coverImage,
      images: images || [],
      isFeatured: isFeatured || false,
      isHajjUmrah: isHajjUmrah || false,
      isActive: true,
      metaTitle,
      metaDescription,
      rating: 0,
      totalReviews: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });

  // Log activity
  await prisma.activity_logs.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      userId: req.user.id,
      action: 'CREATE_TOUR',
      entity: 'TOUR',
      entityId: tour.id,
      details: {
        title: tour.title,
        destination: tour.destination
      }
    }
  });

  res.status(201).json(
    new ApiResponse(201, tour, 'Tour created successfully')
  );
});

/**
 * @desc    Update tour
 * @route   PUT /api/admin/tours/:id
 * @access  Private/Admin
 */
export const updateTour = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };

  // Check if tour exists
  const existingTour = await prisma.tours.findUnique({
    where: { id }
  });

  if (!existingTour) {
    throw new ApiError(404, 'Tour not found');
  }

  // If slug is being updated, check for duplicates
  if (updateData.slug && updateData.slug !== existingTour.slug) {
    const slugExists = await prisma.tours.findUnique({
      where: { slug: updateData.slug }
    });

    if (slugExists) {
      throw new ApiError(400, 'A tour with this slug already exists');
    }
  }

  // Convert numeric fields
  if (updateData.duration) updateData.duration = parseInt(updateData.duration);
  if (updateData.price) updateData.price = parseFloat(updateData.price);
  if (updateData.discountPrice) updateData.discountPrice = parseFloat(updateData.discountPrice);
  if (updateData.maxGroupSize) updateData.maxGroupSize = parseInt(updateData.maxGroupSize);

  updateData.updatedAt = new Date();

  const tour = await prisma.tours.update({
    where: { id },
    data: updateData
  });

  // Log activity
  await prisma.activity_logs.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      userId: req.user.id,
      action: 'UPDATE_TOUR',
      entity: 'TOUR',
      entityId: tour.id,
      details: {
        title: tour.title,
        changes: Object.keys(updateData)
      }
    }
  });

  res.json(new ApiResponse(200, tour, 'Tour updated successfully'));
});

/**
 * @desc    Toggle tour active status
 * @route   PATCH /api/admin/tours/:id/toggle
 * @access  Private/Admin
 */
export const toggleTourStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const tour = await prisma.tours.findUnique({
    where: { id }
  });

  if (!tour) {
    throw new ApiError(404, 'Tour not found');
  }

  const updatedTour = await prisma.tours.update({
    where: { id },
    data: {
      isActive: !tour.isActive,
      updatedAt: new Date()
    }
  });

  // Log activity
  await prisma.activity_logs.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      userId: req.user.id,
      action: 'TOGGLE_TOUR_STATUS',
      entity: 'TOUR',
      entityId: tour.id,
      details: {
        title: tour.title,
        oldStatus: tour.isActive,
        newStatus: !tour.isActive
      }
    }
  });

  res.json(new ApiResponse(200, updatedTour, `Tour ${updatedTour.isActive ? 'activated' : 'deactivated'} successfully`));
});

/**
 * @desc    Toggle tour featured status
 * @route   PATCH /api/admin/tours/:id/featured
 * @access  Private/Admin
 */
export const toggleTourFeatured = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const tour = await prisma.tours.findUnique({
    where: { id }
  });

  if (!tour) {
    throw new ApiError(404, 'Tour not found');
  }

  const updatedTour = await prisma.tours.update({
    where: { id },
    data: {
      isFeatured: !tour.isFeatured,
      updatedAt: new Date()
    }
  });

  // Log activity
  await prisma.activity_logs.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      userId: req.user.id,
      action: 'TOGGLE_TOUR_FEATURED',
      entity: 'TOUR',
      entityId: tour.id,
      details: {
        title: tour.title,
        isFeatured: !tour.isFeatured
      }
    }
  });

  res.json(new ApiResponse(200, updatedTour, `Tour ${updatedTour.isFeatured ? 'marked as featured' : 'unmarked from featured'}`));
});

/**
 * @desc    Delete tour
 * @route   DELETE /api/admin/tours/:id
 * @access  Private/Admin
 */
export const deleteTour = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const tour = await prisma.tours.findUnique({
    where: { id },
    select: { title: true }
  });

  if (!tour) {
    throw new ApiError(404, 'Tour not found');
  }

  // Check for active bookings
  const activeBookings = await prisma.bookings.count({
    where: {
      tourId: id,
      bookingStatus: { in: ['PENDING', 'CONFIRMED'] }
    }
  });

  if (activeBookings > 0) {
    throw new ApiError(400, 'Cannot delete tour with active bookings. Please complete or cancel them first.');
  }

  await prisma.tours.delete({
    where: { id }
  });

  // Log activity
  await prisma.activity_logs.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      userId: req.user.id,
      action: 'DELETE_TOUR',
      entity: 'TOUR',
      entityId: id,
      details: {
        title: tour.title
      }
    }
  });

  res.json(new ApiResponse(200, null, 'Tour deleted successfully'));
});
