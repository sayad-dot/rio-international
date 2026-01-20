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

// CORS configuration
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
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
    const count = await prisma.visa_packages.count();
    if (count > 0) {
      return res.json({ success: true, message: `Database already has ${count} packages`, count });
    }

    const packages = [
      { country: "United Arab Emirates", slug: "dubai-tourist-visa", type: "Tourist", cost: 17500, isPopular: true },
      { country: "Thailand", slug: "thailand-tourist-visa", type: "Tourist", cost: 8500, isPopular: true },
      { country: "Malaysia", slug: "malaysia-tourist-visa", type: "Tourist", cost: 5500, isPopular: true },
      { country: "Singapore", slug: "singapore-tourist-visa", type: "Tourist", cost: 9500, isPopular: true },
      { country: "India", slug: "india-tourist-visa", type: "Tourist", cost: 3500, isPopular: false },
      { country: "United Arab Emirates", slug: "dubai-business-visa", type: "Business", cost: 25000, isPopular: true },
      { country: "Saudi Arabia", slug: "saudi-business-visa", type: "Business", cost: 22000, isPopular: false },
      { country: "United Kingdom", slug: "uk-student-visa", type: "Student", cost: 45000, isPopular: true },
      { country: "Canada", slug: "canada-student-visa", type: "Student", cost: 50000, isPopular: true },
      { country: "Australia", slug: "australia-work-visa", type: "Work Permit", cost: 65000, isPopular: true },
      { country: "Germany", slug: "germany-work-visa", type: "Work Permit", cost: 55000, isPopular: false },
      { country: "Japan", slug: "japan-tourist-visa", type: "Tourist", cost: 12000, isPopular: true },
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
          imageUrl: `/images/${pkg.slug}.jpg`,
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
    message: 'Rio International Travel Agency API',
    version: '1.0.0',
  });
});

// Import routes here (will be added in later phases)
// import authRoutes from './routes/auth.routes.js';
// import tourRoutes from './routes/tour.routes.js';
// import bookingRoutes from './routes/booking.routes.js';
import visaRoutes from './routes/visaRoutes.js';

// Use routes
// app.use('/api/auth', authRoutes);
// app.use('/api/tours', tourRoutes);
// app.use('/api/bookings', bookingRoutes);
app.use('/api/visa', visaRoutes);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

export default app;
