import { recipeRepository } from '../repositories/recipe.repository.js';
import { ingredientRepository } from '../repositories/ingredient.repository.js';
import { calculateCosineSimilarity } from '../ai/similarity.js';
import { createFlavorVector } from '../ai/vectorSpace.js';

class RecipeService {
  async getRecommendations(searchQuery = '', ingredientIds = [], dietaryRestrictions = []) {
    let recipes = await recipeRepository.getAll();

    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      recipes = recipes.filter(recipe => {
        const titleMatch = recipe.title.toLowerCase().includes(q);
        const categoryMatch = recipe.category.toLowerCase().includes(q);
        const descMatch = recipe.description.toLowerCase().includes(q);
        const tagMatch = recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(q));
        return titleMatch || categoryMatch || descMatch || tagMatch;
      });
    }

    const userIngredients = await ingredientRepository.getByIds(ingredientIds);

    if (userIngredients.length === 0) {
      return recipes.map(recipe => ({
        ...recipe,
        matchConfidence: 85
      }));
    }

    const compositeVec = new Array(64).fill(0);
    userIngredients.forEach(ing => {
      ing.flavor_vector.forEach((val, idx) => {
        compositeVec[idx] += val;
      });
    });

    const scored = recipes.map(recipe => {
      const recipeIngNames = recipe.ingredients.map(i => i.name.toLowerCase());
      const userIngNames = userIngredients.map(i => i.name.toLowerCase());
      const exactMatches = userIngNames.filter(u => recipeIngNames.some(r => r.includes(u) || u.includes(r)));
      const overlapRatio = userIngredients.length > 0 ? exactMatches.length / userIngredients.length : 0;
      const matchScore = Math.min(99, Math.max(60, Math.round((recipe.synergy_score * 0.6) + (overlapRatio * 40))));

      return {
        ...recipe,
        matchConfidence: matchScore,
        matchingIngredientsCount: exactMatches.length
      };
    });

    scored.sort((a, b) => b.matchConfidence - a.matchConfidence);
    return scored;
  }

  async searchByQuery(searchQuery = '') {
    const allRecipes = await recipeRepository.getAll();
    if (!searchQuery || !searchQuery.trim()) {
      return allRecipes;
    }

    const q = searchQuery.toLowerCase().trim();
    return allRecipes
      .filter(recipe => {
        const titleMatch = recipe.title.toLowerCase().includes(q);
        const categoryMatch = recipe.category.toLowerCase().includes(q);
        const descMatch = recipe.description.toLowerCase().includes(q);
        const tagMatch = recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(q));
        return titleMatch || categoryMatch || descMatch || tagMatch;
      })
      .map(recipe => ({
        ...recipe,
        matchConfidence: 90
      }));
  }

  async getRecipeById(id) {
    const recipe = await recipeRepository.getById(id);
    if (!recipe) {
      throw new Error(`Recipe with ID '${id}' not found.`);
    }
    return recipe;
  }
}

export const recipeService = new RecipeService();
