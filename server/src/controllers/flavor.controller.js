import { flavorService } from '../services/flavor.service.js';
import { ingredientRepository } from '../repositories/ingredient.repository.js';
import { asyncHandler } from '../middlewares/error.middleware.js';

export const mapFlavors = asyncHandler(async (req, res) => {
  const { ingredientIds } = req.body;
  if (!ingredientIds || !Array.isArray(ingredientIds) || ingredientIds.length === 0) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      error: { message: 'Must provide an array of ingredientIds.' }
    });
  }

  const result = await flavorService.mapIngredients(ingredientIds);
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: result
  });
});

export const getSubstitutes = asyncHandler(async (req, res) => {
  const { ingredientId, dietaryRestrictions } = req.body;
  if (!ingredientId) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      error: { message: 'ingredientId is required for substitution query.' }
    });
  }

  const result = await flavorService.getSubstitutes(ingredientId, dietaryRestrictions || []);
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: result
  });
});

export const searchIngredients = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const ingredients = await ingredientRepository.searchByNameOrCategory(q || '');
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: { ingredients }
  });
});

export const processAiPrompt = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      error: { message: 'Prompt text is required.' }
    });
  }

  const result = await flavorService.processAiPrompt(prompt);
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: {
      ...result,
      mappedIngredients: result.topMatchedIngredients
    }
  });
});
