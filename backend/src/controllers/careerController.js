import prisma from '../config/database.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

// @desc    Get all active jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await prisma.job.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { applications: true }
      }
    }
  });

  res.json(new ApiResponse(200, jobs, 'Jobs fetched successfully'));
});

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      _count: {
        select: { applications: true }
      }
    }
  });

  if (!job) {
    throw new ApiError(404, 'Job not found');
  }

  res.json(new ApiResponse(200, job, 'Job fetched successfully'));
});

// @desc    Create job application
// @route   POST /api/jobs/:id/apply
// @access  Public
const applyForJob = asyncHandler(async (req, res) => {
  const { id: jobId } = req.params;
  const { name, email, phone, experience, coverLetter } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !experience || !coverLetter) {
    throw new ApiError(400, 'All fields are required');
  }

  // Check if job exists and is active
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job || !job.isActive) {
    throw new ApiError(404, 'Job not found or no longer active');
  }

  // Check if user already applied
  const existingApplication = await prisma.jobApplication.findFirst({
    where: {
      jobId,
      email
    }
  });

  if (existingApplication) {
    throw new ApiError(400, 'You have already applied for this position');
  }

  // Create application
  const application = await prisma.jobApplication.create({
    data: {
      jobId,
      name,
      email,
      phone,
      experience,
      coverLetter,
      status: 'PENDING'
    },
    include: {
      job: {
        select: {
          title: true,
          department: true
        }
      }
    }
  });

  res.status(201).json(
    new ApiResponse(201, application, 'Application submitted successfully')
  );
});

// ============ ADMIN CONTROLLERS ============

// @desc    Get all jobs (including inactive) - Admin
// @route   GET /api/admin/jobs
// @access  Private/Admin
const getAllJobsAdmin = asyncHandler(async (req, res) => {
  console.log('📋 Admin fetching all jobs...');
  console.log('User:', req.user);
  
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { applications: true }
      }
    }
  });

  console.log(`✅ Found ${jobs.length} jobs`);
  res.json(new ApiResponse(200, jobs, 'Jobs fetched successfully'));
});

// @desc    Create new job - Admin
// @route   POST /api/admin/jobs
// @access  Private/Admin
const createJob = asyncHandler(async (req, res) => {
  console.log('📝 Admin creating new job...');
  console.log('User:', req.user);
  console.log('Body:', req.body);
  
  const {
    title,
    department,
    type,
    location,
    salary,
    description,
    requirements,
    responsibilities,
    benefits,
    positions
  } = req.body;

  // Validate required fields
  if (!title || !department || !type || !location || !salary || !description) {
    throw new ApiError(400, 'Please provide all required fields');
  }

  const job = await prisma.job.create({
    data: {
      title,
      department,
      type,
      location,
      salary,
      description,
      requirements: requirements || [],
      responsibilities: responsibilities || [],
      benefits: benefits || [],
      positions: positions || 1,
      isActive: true
    }
  });

  console.log('✅ Job created:', job.id);
  res.status(201).json(
    new ApiResponse(201, job, 'Job created successfully')
  );
});

// @desc    Update job - Admin
// @route   PUT /api/admin/jobs/:id
// @access  Private/Admin
const updateJob = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) {
    throw new ApiError(404, 'Job not found');
  }

  const updatedJob = await prisma.job.update({
    where: { id },
    data: updateData,
    include: {
      _count: {
        select: { applications: true }
      }
    }
  });

  res.json(new ApiResponse(200, updatedJob, 'Job updated successfully'));
});

// @desc    Delete job - Admin
// @route   DELETE /api/admin/jobs/:id
// @access  Private/Admin
const deleteJob = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) {
    throw new ApiError(404, 'Job not found');
  }

  await prisma.job.delete({ where: { id } });

  res.json(new ApiResponse(200, null, 'Job deleted successfully'));
});

// @desc    Get all applications - Admin
// @route   GET /api/admin/applications
// @access  Private/Admin
const getAllApplications = asyncHandler(async (req, res) => {
  const { status, jobId } = req.query;

  const where = {};
  if (status) where.status = status;
  if (jobId) where.jobId = jobId;

  const applications = await prisma.jobApplication.findMany({
    where,
    orderBy: { appliedAt: 'desc' },
    include: {
      job: {
        select: {
          id: true,
          title: true,
          department: true,
          type: true
        }
      }
    }
  });

  res.json(new ApiResponse(200, applications, 'Applications fetched successfully'));
});

// @desc    Get single application - Admin
// @route   GET /api/admin/applications/:id
// @access  Private/Admin
const getApplicationById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const application = await prisma.jobApplication.findUnique({
    where: { id },
    include: {
      job: true
    }
  });

  if (!application) {
    throw new ApiError(404, 'Application not found');
  }

  res.json(new ApiResponse(200, application, 'Application fetched successfully'));
});

// @desc    Update application status - Admin
// @route   PATCH /api/admin/applications/:id
// @access  Private/Admin
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  if (!status) {
    throw new ApiError(400, 'Status is required');
  }

  const application = await prisma.jobApplication.findUnique({ where: { id } });
  if (!application) {
    throw new ApiError(404, 'Application not found');
  }

  const updatedApplication = await prisma.jobApplication.update({
    where: { id },
    data: {
      status,
      ...(notes && { notes })
    },
    include: {
      job: {
        select: {
          title: true,
          department: true
        }
      }
    }
  });

  res.json(
    new ApiResponse(200, updatedApplication, 'Application updated successfully')
  );
});

export {
  // Public
  getJobs,
  getJobById,
  applyForJob,
  
  // Admin
  getAllJobsAdmin,
  createJob,
  updateJob,
  deleteJob,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus
};
