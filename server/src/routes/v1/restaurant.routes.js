import { Router } from 'express';
import { 
  searchRestaurants, 
  getRestaurantById 
} from '../../controllers/restaurant.controller.js';
import { autocompleteCities, getCityCoordinates } from '../../controllers/places.controller.js';

const router = Router();

router.get('/cities/autocomplete', autocompleteCities);
router.get('/cities/coordinates', getCityCoordinates);
router.get('/search', searchRestaurants);
router.get('/:id', getRestaurantById);

export default router;
