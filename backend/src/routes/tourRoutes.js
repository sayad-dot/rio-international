import express from 'express';
import { 
    getAllTours, 
    getTourBySlug, 
    getTourById, 
    getFeaturedTours 
} from '../controllers/tourController.js';

const router = express.Router();

// Public routes
router.get('/', getAllTours);
router.get('/featured', getFeaturedTours);
router.get('/slug/:slug', getTourBySlug);
router.get('/:id', getTourById);

export default router;
