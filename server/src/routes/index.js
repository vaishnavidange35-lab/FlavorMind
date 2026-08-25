import { Router } from 'express';
import authRoutes from './v1/auth.routes.js';
import flavorRoutes from './v1/flavor.routes.js';
import recipeRoutes from './v1/recipe.routes.js';
import userRoutes from './v1/user.routes.js';
import restaurantRoutes from './v1/restaurant.routes.js';
import imageRoutes from './v1/image.routes.js';

const router = Router();

router.use('/v1/auth', authRoutes);
router.use('/v1/flavors', flavorRoutes);
router.use('/v1/recipes', recipeRoutes);
router.use('/v1/user', userRoutes);
router.use('/v1/restaurants', restaurantRoutes);
router.use('/v1/images', imageRoutes);

export default router;
