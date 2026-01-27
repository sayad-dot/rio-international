import express from 'express';
import {
  getJobs,
  getJobById,
  applyForJob
} from '../controllers/careerController.js';

const router = express.Router();

// Public routes
router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/:id/apply', applyForJob);

export default router;
