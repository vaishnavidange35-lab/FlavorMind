import { Router } from 'express';
import { updatePalate } from '../../controllers/user.controller.js';
import { authenticateJWT } from '../../middlewares/auth.middleware.js';

const router = Router();

router.put('/palate', authenticateJWT, updatePalate);

export default router;
