import { asyncHandler } from '../middlewares/error.middleware.js';
import { ApiError } from '../utils/ApiError.js';

// Cache to prevent spamming APIs
const cache = new Map();

export const autocompleteCities = asyncHandler(async (req, res) => {
  const { input } = req.query;
  
  if (!input || input.trim().length < 2) {
    return res.status(200).json({ success: true, data: [] });
  }

  const query = input.trim();
  const cacheKey = `autocomplete_${query.toLowerCase()}`;

  if (cache.has(cacheKey)) {
    return res.status(200).json({ success: true, data: cache.get(cacheKey) });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  try {
    let suggestions = [];

    if (apiKey && apiKey.length > 10 && apiKey !== 'placeholder-key') {
      // Use Google Maps Places API if key exists
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&types=(cities)&components=country:in&key=${apiKey}`
      );
      const data = await response.json();
      
      suggestions = data.predictions.map(p => ({
        id: p.place_id,
        name: p.description,
        isGoogle: true,
      }));
    } else {
      // Fallback: Free Nominatim (OpenStreetMap) API
      // Add custom user agent as required by Nominatim terms of use
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&countrycodes=in&format=json&limit=5`,
        { headers: { 'User-Agent': 'FlavorMind-App/1.0' } }
      );
      const data = await response.json();
      
      suggestions = data.map(p => ({
        id: p.place_id,
        name: p.display_name, // e.g. "Pune, Maharashtra, India"
        lat: parseFloat(p.lat),
        lng: parseFloat(p.lon),
        isGoogle: false,
      }));
    }

    // Cache results for 10 minutes
    cache.set(cacheKey, suggestions);
    setTimeout(() => cache.delete(cacheKey), 10 * 60 * 1000);

    res.status(200).json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    console.error("Autocomplete API Error:", error.message);
    throw new ApiError(500, "Failed to fetch city suggestions");
  }
});

export const getCityCoordinates = asyncHandler(async (req, res) => {
  const { placeId } = req.query;

  if (!placeId) {
    throw new ApiError(400, "Place ID is required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
  try {
    if (apiKey && apiKey.length > 10 && apiKey !== 'placeholder-key') {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${apiKey}`
      );
      const data = await response.json();
      
      const location = data.result?.geometry?.location;
      if (location) {
        return res.status(200).json({
          success: true,
          data: { lat: location.lat, lng: location.lng }
        });
      }
      throw new Error("Coordinates not found");
    } else {
      // If using Nominatim, coordinates are already known by the client,
      // but this endpoint exists for completeness if needed.
      return res.status(200).json({ success: true, data: null });
    }
  } catch (error) {
    console.error("Place Details API Error:", error.message);
    throw new ApiError(500, "Failed to fetch city coordinates");
  }
});
