import express from 'express';
import * as visaController from '../controllers/visaController.js';

const router = express.Router();

router.get('/', visaController.getAllVisaPackages);
router.get('/:slug', visaController.getVisaPackageBySlug);

export default router;
