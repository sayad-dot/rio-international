import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import config from './config/index.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

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
