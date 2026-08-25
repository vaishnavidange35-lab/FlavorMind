import { recipeService } from '../services/recipe.service.js';
import { asyncHandler } from '../middlewares/error.middleware.js';
import { ingredientRepository } from '../repositories/ingredient.repository.js';
import { mapDishImages } from '../utils/dishImageMapper.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const massiveDataPath = path.join(__dirname, '../data/massiveRecipesData.json');

// Load massive data into memory once
let massiveRecipes = [];
try {
  if (fs.existsSync(massiveDataPath)) {
    massiveRecipes = JSON.parse(fs.readFileSync(massiveDataPath, 'utf8'));
  }
} catch (error) {
  console.error("Could not load massiveRecipesData.json", error);
}

const runNLU = (query, allRecipes, inventory = []) => {
  const q = query.toLowerCase().trim();
  const stopWords = ["i", "want", "something", "but", "and", "or", "have", "only", "food", "for", "eating", "craving", "like", "feel", "at", "home", "under", "with", "a", "an", "the", "some", "my", "is", "am", "are", "dishes", "dish"];
  
  // Combine query and inventory for keyword extraction
  const fullText = q + " " + inventory.join(" ");
  const rawTokens = fullText.split(/[\s,]+/);
  const tokens = rawTokens.filter(t => t && !stopWords.includes(t.toLowerCase()));

  if (tokens.length === 0) {
    return allRecipes.slice(0, 12);
  }

  const scoredRecipes = allRecipes.map(rec => {
    let score = 0;
    let matchedTags = [];
    let matchedIngredients = [];

    const titleStr = typeof rec.title === 'string' ? rec.title.toLowerCase() : Object.values(rec.title || {}).join(' ').toLowerCase();
    const ingredientsList = rec.ingredients?.en ? rec.ingredients.en.map(i => i.toLowerCase()) : [];
    const tagsList = (rec.tags || []).map(t => t.toLowerCase());
    const cuisineStr = (rec.cuisine || '').toLowerCase();
    const stateStr = (rec.state || '').toLowerCase();

    tokens.forEach(token => {
      const tok = token.toLowerCase();
      // Tag matching
      const matchedTag = tagsList.find(t => t.includes(tok));
      if (matchedTag) {
        score += 10;
        if (!matchedTags.includes(matchedTag)) matchedTags.push(matchedTag);
      }
      
      // Ingredient matching
      const matchedIng = ingredientsList.find(i => i.includes(tok));
      if (matchedIng) {
        score += 8;
        if (!matchedIngredients.includes(tok)) matchedIngredients.push(tok);
      }

      // Title & Location matching
      if (titleStr.includes(tok)) score += 5;
      if (cuisineStr.includes(tok) || stateStr.includes(tok)) score += 8;
    });

    let recommendationReason = "";
    if (matchedTags.length > 0 && matchedIngredients.length > 0) {
      recommendationReason = `Recommended because you wanted ${matchedTags[0]} food and have ${matchedIngredients[0]}.`;
    } else if (matchedTags.length > 0) {
      recommendationReason = `Recommended because you wanted ${matchedTags.join(" & ")} food.`;
    } else if (matchedIngredients.length > 0) {
      recommendationReason = `Recommended because you have ${matchedIngredients.join(" & ")}.`;
    } else if (score > 0) {
      recommendationReason = `A great match for your craving!`;
    }

    return {
      ...rec,
      score,
      recommendationReason
    };
  });

  return scoredRecipes
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
};

export const getRecommendations = asyncHandler(async (req, res) => {
  const { inventory, searchQuery } = req.body;
  const recipes = mapDishImages(runNLU(searchQuery || '', massiveRecipes, inventory || []));
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: { recipes }
  });
});

export const exploreRecipes = asyncHandler(async (req, res) => {
  const { state, limit = 12, offset = 0 } = req.query;
  let results = massiveRecipes;
  
  if (state && state !== "All") {
    results = results.filter(r => r.state === state);
  }
  
  const paginated = results.slice(Number(offset), Number(offset) + Number(limit));
  
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: {
      total: results.length,
      recipes: mapDishImages(paginated)
    }
  });
});

export const getTopRecipes = asyncHandler(async (req, res) => {
  const { filter = "Top Rated" } = req.query;
  let results = [...massiveRecipes];
  
  if (filter === "Top Rated") {
    results.sort((a, b) => b.rating - a.rating);
  } else if (filter === "Trending") {
    results.sort((a, b) => b.metrics.searches - a.metrics.searches);
  } else if (filter === "Most Loved") {
    results.sort((a, b) => b.metrics.loved - a.metrics.loved);
  } else if (filter === "Most Ordered") {
    results.sort((a, b) => b.metrics.orders - a.metrics.orders);
  } else if (filter === "Most Authentic") {
    results.sort((a, b) => b.authenticityScore - a.authenticityScore);
  }
  
  // Return top 100
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: { recipes: mapDishImages(results.slice(0, 100)) }
  });
});

export const searchRecipes = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const recipes = mapDishImages(runNLU(q || '', massiveRecipes));
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: { recipes }
  });
});

export const getRecipeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Check massive dataset first
  const massiveRecipe = massiveRecipes.find(r => r.id === id);
  if (massiveRecipe) {
    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: { recipe: { ...massiveRecipe, image: mapDishImages([massiveRecipe])[0].image } }
    });
  }
  
  // Fallback
  const recipe = await recipeService.getRecipeById(id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: { recipe }
  });
});
