import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Endpoints
export const flavorApi = {
  searchIngredients: (query) =>
    api.get(`/flavors/ingredients/search?q=${encodeURIComponent(query || "")}`),
  mapFlavors: (ingredientIds) => api.post("/flavors/map", { ingredientIds }),
  getSubstitutes: (ingredientId, dietaryRestrictions = []) =>
    api.post("/flavors/substitute", { ingredientId, dietaryRestrictions }),
  processAiPrompt: (prompt) => api.post("/flavors/prompt", { prompt }),
};

export const recipeApi = {
  getRecommendations: (ingredientIds = [], dietaryRestrictions = [], searchQuery = "") =>
    api.post("/recipes/recommendations", {
      inventory: ingredientIds,
      dietaryRestrictions,
      searchQuery,
    }),
  search: (query) => api.get(`/recipes/search?q=${encodeURIComponent(query || "")}`),
  explore: (state, limit = 12, offset = 0) => api.get(`/recipes/explore?state=${encodeURIComponent(state)}&limit=${limit}&offset=${offset}`),
  getTop: (filter) => api.get(`/recipes/top?filter=${encodeURIComponent(filter)}`),
  getById: (id) => api.get(`/recipes/${id}`),
};

export const restaurantApi = {
  search: (params) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/restaurants/search?${query}`);
  },
  getById: (id) => api.get(`/restaurants/${id}`),
  autocompleteCities: (input) => api.get(`/restaurants/cities/autocomplete?input=${encodeURIComponent(input)}`),
  getCityCoordinates: (placeId) => api.get(`/restaurants/cities/coordinates?placeId=${encodeURIComponent(placeId)}`),
};
