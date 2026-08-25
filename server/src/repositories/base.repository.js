import { supabase } from '../config/supabase.js';

export class BaseRepository {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async getAll(columns = '*') {
    if (!supabase) return [];
    const { data, error } = await supabase.from(this.tableName).select(columns);
    if (error) throw error;
    return data;
  }

  async getById(id, columns = '*') {
    if (!supabase) return null;
    const { data, error } = await supabase.from(this.tableName).select(columns).eq('id', id).single();
    if (error && error.code !== 'PGRST116') throw error; // Ignore not found error
    return data || null;
  }

  async create(payload) {
    if (!supabase) return null;
    const { data, error } = await supabase.from(this.tableName).insert(payload).select().single();
    if (error) throw error;
    return data;
  }

  async update(id, payload) {
    if (!supabase) return null;
    const { data, error } = await supabase.from(this.tableName).update(payload).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async delete(id) {
    if (!supabase) return false;
    const { error } = await supabase.from(this.tableName).delete().eq('id', id);
    if (error) throw error;
    return true;
  }
}
