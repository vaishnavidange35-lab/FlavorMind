import { createClient } from '@supabase/supabase-js';
import { config } from './env.js';

let supabaseClient = null;

if (config.supabaseUrl && config.supabaseUrl !== 'https://placeholder-flavormind.supabase.co') {
  try {
    supabaseClient = createClient(config.supabaseUrl, config.supabaseAnonKey);
    console.log('[Supabase] Client initialized successfully.');
  } catch (err) {
    console.warn('[Supabase] Failed to initialize Supabase client:', err.message);
  }
} else {
  console.log('[Supabase] Running in Standalone AI Storage Mode (In-Memory Vector Engine active).');
}

export const supabase = supabaseClient;
