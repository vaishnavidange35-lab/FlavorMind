import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase } from '../config/supabase.js';
import { getMappedDishImage } from '../utils/dishImageMapper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const massiveRecipesPath = path.join(__dirname, '../data/massiveRecipesData.json');


class RecipeRepository {
  async getAll() {
    if (supabase) {
      const { data, error } = await supabase.from('recipes').select('*');
      if (!error && data && data.length > 0) {
        return data.map((recipe) => ({
          ...recipe,
          image: getMappedDishImage(recipe),
        }));
      }
    }
    
    // Load the 400+ dynamically generated recipes
    try {
      const data = fs.readFileSync(massiveRecipesPath, 'utf8');
      return JSON.parse(data).map((recipe) => ({
        ...recipe,
        image: getMappedDishImage(recipe),
      }));
    } catch (err) {
      console.error("Failed to load massive recipes data:", err);
      return [];
    }
  }

  async getById(id) {
    const all = await this.getAll();
    return all.find(r => r.id === id) || null;
  }

  async searchRecipes(query = '', category = '') {
    const all = await this.getAll();
    const q = query.toLowerCase().trim();
    
    if (!q) {
      return all.filter(rec => !category || (rec.category && rec.category.toLowerCase() === category.toLowerCase())).slice(0, 12);
    }

    // NLU Heuristic Logic
    const stopWords = ["i", "want", "something", "but", "and", "or", "have", "only", "food", "for", "eating", "craving", "like", "feel", "at", "home", "under", "with", "a", "an", "the", "some", "my", "is", "am", "are", "dishes", "dish"];
    const rawTokens = q.split(/[\s,]+/);
    const tokens = rawTokens.filter(t => t && !stopWords.includes(t));

    const scoredRecipes = all.map(rec => {
      let score = 0;
      let matchedTags = [];
      let matchedIngredients = [];

      const titleStr = typeof rec.title === 'string' ? rec.title.toLowerCase() : Object.values(rec.title || {}).join(' ').toLowerCase();
      const ingredientsList = rec.ingredients?.en ? rec.ingredients.en.map(i => i.toLowerCase()) : [];
      const tagsList = (rec.tags || []).map(t => t.toLowerCase());

      tokens.forEach(token => {
        // Tag matching
        const matchedTag = (rec.tags || []).find(t => t.toLowerCase().includes(token));
        if (matchedTag) {
          score += 10;
          if (!matchedTags.includes(matchedTag)) matchedTags.push(matchedTag);
        }
        
        // Ingredient matching
        const matchedIng = ingredientsList.find(i => i.includes(token));
        if (matchedIng) {
          score += 8;
          if (!matchedIngredients.includes(token)) matchedIngredients.push(token);
        }

        // Title matching
        if (titleStr.includes(token)) {
          score += 5;
        }
      });

      // Boost for exact category match
      if (category && rec.category && rec.category.toLowerCase() === category.toLowerCase()) {
        score += 20;
      }

      let recommendationReason = "";
      if (matchedTags.length > 0) {
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
  }
}

export const recipeRepository = new RecipeRepository();
