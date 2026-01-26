import express from 'express';
import { protect, authorize } from '../middleware/auth.js';

// Import admin controllers
import * as dashboardController from '../controllers/admin/dashboardController.js';
import * as bookingController from '../controllers/admin/bookingController.js';
import * as tourController from '../controllers/admin/tourController.js';
import * as visaController from '../controllers/admin/visaController.js';
import * as reviewController from '../controllers/admin/reviewController.js';
import * as customerController from '../controllers/admin/customerController.js';

const router = express.Router();

// Apply authentication and admin authorization to all routes
router.use(protect);
router.use(authorize('ADMIN', 'SUPER_ADMIN'));

// ============================
// Dashboard Routes
// ============================
router.get('/dashboard/stats', dashboardController.getDashboardStats);
router.get('/dashboard/trends', dashboardController.getBookingTrends);
router.get('/dashboard/popular-destinations', dashboardController.getPopularDestinations);

// ============================
// Booking Management Routes
// ============================
router.get('/bookings', bookingController.getAllBookings);
router.get('/bookings/export', bookingController.exportBookings);
router.get('/bookings/:id', bookingController.getBookingById);
router.patch('/bookings/:id/status', bookingController.updateBookingStatus);
router.patch('/bookings/:id/payment', bookingController.updatePaymentStatus);
router.delete('/bookings/:id', bookingController.deleteBooking);

// ============================
// Tour Management Routes
// ============================
router.get('/tours', tourController.getAllToursAdmin);
router.post('/tours', tourController.createTour);
router.put('/tours/:id', tourController.updateTour);
router.patch('/tours/:id/toggle', tourController.toggleTourStatus);
router.patch('/tours/:id/featured', tourController.toggleTourFeatured);
router.delete('/tours/:id', tourController.deleteTour);

// ============================
// Visa Package Management Routes
// ============================
router.get('/visa', visaController.getAllVisaPackagesAdmin);
router.post('/visa', visaController.createVisaPackage);
router.put('/visa/:id', visaController.updateVisaPackage);
router.patch('/visa/:id/popular', visaController.toggleVisaPopular);
router.delete('/visa/:id', visaController.deleteVisaPackage);

// ============================
// Review Management Routes
// ============================
router.get('/reviews', reviewController.getAllReviews);
router.patch('/reviews/:id/approve', reviewController.approveReview);
router.patch('/reviews/:id/reject', reviewController.rejectReview);
router.delete('/reviews/:id', reviewController.deleteReview);

// ============================
// Customer Management Routes
// ============================
router.get('/customers', customerController.getAllCustomers);
router.get('/customers/:id', customerController.getCustomerById);

export default router;
