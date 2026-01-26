import prisma from '../../config/database.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import ApiError from '../../utils/ApiError.js';

/**
 * @desc    Get all visa packages (admin view)
 * @route   GET /api/admin/visa
 * @access  Private/Admin
 */
export const getAllVisaPackagesAdmin = asyncHandler(async (req, res) => {
  const { 
    country, 
    type, 
    isPopular,
    search,
    page = 1, 
    limit = 20,
    sortBy = 'createdAt',
    order = 'desc'
  } = req.query;

  const where = {};
  
  if (country) where.country = { contains: country, mode: 'insensitive' };
  if (type) where.type = { contains: type, mode: 'insensitive' };
  if (isPopular !== undefined) where.isPopular = isPopular === 'true';
  
  if (search) {
    where.OR = [
      { country: { contains: search, mode: 'insensitive' } },
      { type: { contains: search, mode: 'insensitive' } }
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  const [packages, total] = await Promise.all([
    prisma.visa_packages.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy]: order }
    }),
    prisma.visa_packages.count({ where })
  ]);

  res.json(
    new ApiResponse(200, {
      packages,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    }, 'Visa packages retrieved successfully')
  );
});

/**
 * @desc    Create new visa package
 * @route   POST /api/admin/visa
 * @access  Private/Admin
 */
export const createVisaPackage = asyncHandler(async (req, res) => {
  const {
    country,
    slug,
    type,
    description,
    duration,
    processingTime,
    cost,
    validity,
    entryType,
    requirements,
    documents,
    applicationProcess,
    faqs,
    imageUrl,
    isPopular
  } = req.body;

  // Check if slug already exists
  const existingPackage = await prisma.visa_packages.findUnique({
    where: { slug }
  });

  if (existingPackage) {
    throw new ApiError(400, 'A visa package with this slug already exists');
  }

  const visaPackage = await prisma.visa_packages.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      country,
      slug,
      type,
      description,
      duration,
      processingTime,
      cost: parseFloat(cost),
      validity,
      entryType,
      requirements: requirements || [],
      documents: documents || {},
      applicationProcess: applicationProcess || [],
      faqs: faqs || {},
      imageUrl,
      isPopular: isPopular || false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });

  // Log activity
  await prisma.activity_logs.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      userId: req.user.id,
      action: 'CREATE_VISA_PACKAGE',
      entity: 'VISA_PACKAGE',
      entityId: visaPackage.id,
      details: {
        country: visaPackage.country,
        type: visaPackage.type
      }
    }
  });

  res.status(201).json(
    new ApiResponse(201, visaPackage, 'Visa package created successfully')
  );
});

/**
 * @desc    Update visa package
 * @route   PUT /api/admin/visa/:id
 * @access  Private/Admin
 */
export const updateVisaPackage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };

  // Check if package exists
  const existingPackage = await prisma.visa_packages.findUnique({
    where: { id }
  });

  if (!existingPackage) {
    throw new ApiError(404, 'Visa package not found');
  }

  // If slug is being updated, check for duplicates
  if (updateData.slug && updateData.slug !== existingPackage.slug) {
    const slugExists = await prisma.visa_packages.findUnique({
      where: { slug: updateData.slug }
    });

    if (slugExists) {
      throw new ApiError(400, 'A visa package with this slug already exists');
    }
  }

  // Convert cost to float
  if (updateData.cost) updateData.cost = parseFloat(updateData.cost);

  updateData.updatedAt = new Date();

  const visaPackage = await prisma.visa_packages.update({
    where: { id },
    data: updateData
  });

  // Log activity
  await prisma.activity_logs.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      userId: req.user.id,
      action: 'UPDATE_VISA_PACKAGE',
      entity: 'VISA_PACKAGE',
      entityId: visaPackage.id,
      details: {
        country: visaPackage.country,
        type: visaPackage.type,
        changes: Object.keys(updateData)
      }
    }
  });

  res.json(new ApiResponse(200, visaPackage, 'Visa package updated successfully'));
});

/**
 * @desc    Toggle visa package popular status
 * @route   PATCH /api/admin/visa/:id/popular
 * @access  Private/Admin
 */
export const toggleVisaPopular = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const visaPackage = await prisma.visa_packages.findUnique({
    where: { id }
  });

  if (!visaPackage) {
    throw new ApiError(404, 'Visa package not found');
  }

  const updatedPackage = await prisma.visa_packages.update({
    where: { id },
    data: {
      isPopular: !visaPackage.isPopular,
      updatedAt: new Date()
    }
  });

  // Log activity
  await prisma.activity_logs.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      userId: req.user.id,
      action: 'TOGGLE_VISA_POPULAR',
      entity: 'VISA_PACKAGE',
      entityId: visaPackage.id,
      details: {
        country: visaPackage.country,
        isPopular: !visaPackage.isPopular
      }
    }
  });

  res.json(new ApiResponse(200, updatedPackage, `Visa package ${updatedPackage.isPopular ? 'marked as popular' : 'unmarked from popular'}`));
});

/**
 * @desc    Delete visa package
 * @route   DELETE /api/admin/visa/:id
 * @access  Private/Admin
 */
export const deleteVisaPackage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const visaPackage = await prisma.visa_packages.findUnique({
    where: { id },
    select: { country: true, type: true }
  });

  if (!visaPackage) {
    throw new ApiError(404, 'Visa package not found');
  }

  await prisma.visa_packages.delete({
    where: { id }
  });

  // Log activity
  await prisma.activity_logs.create({
    data: {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      userId: req.user.id,
      action: 'DELETE_VISA_PACKAGE',
      entity: 'VISA_PACKAGE',
      entityId: id,
      details: {
        country: visaPackage.country,
        type: visaPackage.type
      }
    }
  });

  res.json(new ApiResponse(200, null, 'Visa package deleted successfully'));
});
