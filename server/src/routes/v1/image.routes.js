import express from 'express';
import { generateImage } from '../../controllers/image.controller.js';
import { getPixabayImage } from '../../controllers/pixabay.controller.js';

const router = express.Router();

// GET /api/v1/images/generate?dish=...
router.get('/generate', generateImage);

// GET /api/v1/images/pixabay?dish=...
router.get('/pixabay', getPixabayImage);

export default router;
