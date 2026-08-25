import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'flavormind_super_secret_jwt_key_2026_production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  supabaseUrl: process.env.SUPABASE_URL || 'https://placeholder-flavormind.supabase.co',
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || 'placeholder-anon-key',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  pixabayApiKey: process.env.PIXABAY_API_KEY || '56943446-6b3b308db6b6ef5937b1fea6b'
};
