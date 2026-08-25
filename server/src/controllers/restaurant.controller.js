import { asyncHandler } from '../middlewares/error.middleware.js';
import { searchRestaurants as searchLiveRestaurants, getRestaurantById as getLiveRestaurantById } from '../repositories/restaurant.repository.js';
import { ApiError } from '../utils/ApiError.js';

export const searchRestaurants = asyncHandler(async (req, res) => {
  const { city, lat, lng, dish, sort, pageToken } = req.query;
  
  const result = await searchLiveRestaurants({
    city,
    lat,
    lng,
    dish,
    sort,
    pageToken
  });

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: {
      restaurants: result.restaurants,
      nextPageToken: result.nextPageToken,
      isFallback: result.isFallback,
      fallbackMessage: result.fallbackMessage
    }
  });
});

export const getRestaurantById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const restaurant = await getLiveRestaurantById(id);
  
  if (!restaurant) {
    throw new ApiError(404, 'Restaurant not found');
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: { restaurant }
  });
});
