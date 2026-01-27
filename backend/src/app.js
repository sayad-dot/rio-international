import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import config from './config/index.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import prisma from './config/database.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration - Allow both common Vite ports for flexibility
const allowedOrigins = [
  'https://rio-frontend.onrender.com',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.some(allowedOrigin => origin.startsWith(allowedOrigin))) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser
app.use(cookieParser());

// Logging middleware
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Rio International Tours & Travels API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      tours: '/api/tours',
      visa: '/api/visa',
      jobs: '/api/jobs',
      auth: '/api/auth',
      admin: '/api/admin'
    }
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Manual seed endpoint (temporary for debugging)
app.post('/api/seed', async (req, res) => {
  try {
    // Delete existing packages first
    await prisma.visa_packages.deleteMany({});
    console.log('Cleared existing packages');

    const packages = [
      // Tourist Visas (7)
      { country: "United Arab Emirates", slug: "dubai-tourist-visa-30days", type: "Tourist", cost: 17500, isPopular: true, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400" },
      { country: "Thailand", slug: "thailand-tourist-visa-60days", type: "Tourist", cost: 8500, isPopular: true, image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400" },
      { country: "Malaysia", slug: "malaysia-tourist-visa-30days", type: "Tourist", cost: 5500, isPopular: true, image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400" },
      { country: "Singapore", slug: "singapore-tourist-visa-30days", type: "Tourist", cost: 9500, isPopular: true, image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400" },
      { country: "India", slug: "india-tourist-visa-30days", type: "Tourist", cost: 3500, isPopular: false, image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400" },
      { country: "Turkey", slug: "turkey-tourist-visa-90days", type: "Tourist", cost: 6500, isPopular: false, image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400" },
      { country: "Japan", slug: "japan-tourist-visa-30days", type: "Tourist", cost: 12000, isPopular: true, image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400" },
      // Business Visas (4)
      { country: "United Arab Emirates", slug: "dubai-business-visa-90days", type: "Business", cost: 25000, isPopular: true, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400" },
      { country: "Saudi Arabia", slug: "saudi-business-visa-90days", type: "Business", cost: 22000, isPopular: false, image: "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=400" },
      { country: "China", slug: "china-business-visa-90days", type: "Business", cost: 18000, isPopular: true, image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400" },
      { country: "United States", slug: "usa-business-visa-b1", type: "Business", cost: 35000, isPopular: true, image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400" },
      // Student Visas (4)
      { country: "United Kingdom", slug: "uk-student-visa-tier4", type: "Student", cost: 45000, isPopular: true, image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400" },
      { country: "Canada", slug: "canada-student-visa-study-permit", type: "Student", cost: 50000, isPopular: true, image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=400" },
      { country: "Australia", slug: "australia-student-visa-subclass500", type: "Student", cost: 48000, isPopular: true, image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400" },
      { country: "Germany", slug: "germany-student-visa-national", type: "Student", cost: 42000, isPopular: false, image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400" },
      // Work Permits (7)
      { country: "Australia", slug: "australia-work-visa-subclass482", type: "Work Permit", cost: 65000, isPopular: true, image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400" },
      { country: "Germany", slug: "germany-work-visa-eu-blue-card", type: "Work Permit", cost: 55000, isPopular: true, image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400" },
      { country: "Canada", slug: "canada-work-permit-lmia", type: "Work Permit", cost: 58000, isPopular: true, image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=400" },
      { country: "United Arab Emirates", slug: "uae-work-visa-employment", type: "Work Permit", cost: 28000, isPopular: true, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400" },
      { country: "United Kingdom", slug: "uk-work-visa-skilled-worker", type: "Work Permit", cost: 62000, isPopular: false, image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400" },
      { country: "Singapore", slug: "singapore-work-visa-employment-pass", type: "Work Permit", cost: 45000, isPopular: false, image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400" },
      { country: "New Zealand", slug: "newzealand-work-visa-essential-skills", type: "Work Permit", cost: 52000, isPopular: false, image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400" },
    ];

    for (const pkg of packages) {
      const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
      await prisma.visa_packages.create({
        data: {
          id,
          country: pkg.country,
          slug: pkg.slug,
          type: pkg.type,
          description: `${pkg.type} visa for ${pkg.country}`,
          duration: "30 Days",
          processingTime: "5-7 Days",
          cost: pkg.cost,
          validity: "60 Days",
          entryType: "Single Entry",
          requirements: ["Valid Passport", "Recent Photo"],
          documents: { mandatory: ["Passport", "Photo"] },
          applicationProcess: ["Submit documents", "Processing", "Receive visa"],
          faqs: [],
          imageUrl: pkg.image,
          isPopular: pkg.isPopular,
          updatedAt: new Date()
        }
      });
    }

    const newCount = await prisma.visa_packages.count();
    res.json({ success: true, message: `Seeded ${newCount} packages`, count: newCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API routes
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Rio Tours & Travels API',
    version: '1.0.0',
  });
});

// Import routes here (will be added in later phases)
import authRoutes from './routes/authRoutes.js';
import tourRoutes from './routes/tourRoutes.js';
// import bookingRoutes from './routes/booking.routes.js';
import visaRoutes from './routes/visaRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import careerRoutes from './routes/careerRoutes.js';

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
// app.use('/api/bookings', bookingRoutes);
app.use('/api/visa', visaRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/jobs', careerRoutes);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

export default app;
