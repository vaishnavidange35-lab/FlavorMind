import { Router } from 'express';
import { mapFlavors, getSubstitutes, searchIngredients, processAiPrompt } from '../../controllers/flavor.controller.js';

const router = Router();

router.get('/ingredients/search', searchIngredients);
router.post('/map', mapFlavors);
router.post('/substitute', getSubstitutes);
router.post('/prompt', processAiPrompt);

export default router;
