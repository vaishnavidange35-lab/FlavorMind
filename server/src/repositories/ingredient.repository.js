import { INGREDIENTS_DATA } from '../data/ingredientsData.js';
import { supabase } from '../config/supabase.js';

class IngredientRepository {
  async getAll() {
    if (supabase) {
      const { data, error } = await supabase.from('ingredients').select('*');
      if (!error && data && data.length > 0) return data;
    }
    return INGREDIENTS_DATA;
  }

  async getById(id) {
    const all = await this.getAll();
    return all.find(item => item.id === id || item.name.toLowerCase() === id.toLowerCase()) || null;
  }

  async searchByNameOrCategory(query = '') {
    const all = await this.getAll();
    const q = query.toLowerCase().trim();
    if (!q) return all;

    return all.filter(ing => 
      ing.name.toLowerCase().includes(q) || 
      ing.category.toLowerCase().includes(q) ||
      ing.primary_compounds.some(c => c.toLowerCase().includes(q))
    );
  }

  async getByIds(ids = []) {
    const all = await this.getAll();
    const set = new Set(ids);
    return all.filter(item => set.has(item.id));
  }
}

export const ingredientRepository = new IngredientRepository();
