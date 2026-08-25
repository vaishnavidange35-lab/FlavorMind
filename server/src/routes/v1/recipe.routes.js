import { Router } from 'express';
import { 
  getRecommendations, 
  getRecipeById, 
  exploreRecipes, 
  getTopRecipes, 
  searchRecipes 
} from '../../controllers/recipe.controller.js';

const router = Router();

router.get('/explore', exploreRecipes);
router.get('/top', getTopRecipes);
router.get('/search', searchRecipes);
router.post('/recommendations', getRecommendations);
router.get('/:id', getRecipeById);

export default router;
