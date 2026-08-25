-- =============================================================================
-- FLAVORMIND AI — PRODUCTION POSTGRESQL (SUPABASE) DATABASE SCHEMA
-- Version: 2.0.0
-- Dialect: PostgreSQL 15+ with pgvector & PostGIS extensions
-- =============================================================================

-- 1. EXTENSIONS SETUP
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";      -- High-dimensional flavor vector indexing
CREATE EXTENSION IF NOT EXISTS "pg_trgm";     -- Trigram fuzzy text search indexing

-- 2. ENUM TYPES DEFINITION
CREATE TYPE user_role_enum AS ENUM ('user', 'chef', 'restaurant_admin', 'system_admin');
CREATE TYPE ingredient_role_enum AS ENUM ('base', 'complement', 'accent', 'garnish');
CREATE TYPE media_type_enum AS ENUM ('video_mp4', 'video_hls', 'audio_mp3', 'audio_podcast', 'image_hero');
CREATE TYPE notification_type_enum AS ENUM ('system_alert', 'recommendation_digest', 'recipe_trending', 'inventory_expiry');
CREATE TYPE difficulty_level_enum AS ENUM ('beginner', 'intermediate', 'advanced', 'master_chef');

-- =============================================================================
-- 3. CORE AUTHENTICATION & USER MANAGEMENT TABLES
-- =============================================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    avatar_url TEXT,
    role user_role_enum NOT NULL DEFAULT 'user',
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token_hash VARCHAR(255) NOT NULL,
    user_agent TEXT,
    ip_address INET,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 4. FLAVOR TAXONOMY & VECTOR SPACE TABLES
-- =============================================================================

CREATE TABLE flavor_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE flavor_compounds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    flavor_category_id UUID REFERENCES flavor_categories(id) ON DELETE SET NULL,
    common_name VARCHAR(150) NOT NULL,
    iupac_name VARCHAR(255),
    cas_number VARCHAR(50),
    odour_descriptor TEXT NOT NULL,
    taste_threshold_ppm NUMERIC(10,4),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 5. INGREDIENTS & FLAVOR VECTORS
-- =============================================================================

CREATE TABLE ingredient_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES ingredient_categories(id) ON DELETE RESTRICT,
    name VARCHAR(150) UNIQUE NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,
    flavor_vector vector(64) NOT NULL, -- 64-D Normalized Flavor Space Embedding
    dietary_flags JSONB DEFAULT '[]'::jsonb, -- ['vegan', 'gluten-free', 'nut-free', etc.]
    glycemic_index INT,
    calories_per_100g NUMERIC(8,2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ingredient_compounds (
    ingredient_id UUID REFERENCES ingredients(id) ON DELETE CASCADE,
    compound_id UUID REFERENCES flavor_compounds(id) ON DELETE CASCADE,
    concentration_ppm NUMERIC(10,4),
    PRIMARY KEY (ingredient_id, compound_id)
);

-- =============================================================================
-- 6. INGREDIENT SUBSTITUTES ENGINE TABLES
-- =============================================================================

CREATE TABLE substitute_pairings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    original_ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
    substitute_ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
    similarity_score NUMERIC(5,4) NOT NULL, -- Cosine similarity score (0.0000 to 1.0000)
    conversion_ratio NUMERIC(5,2) DEFAULT 1.00, -- e.g. 1.00 = 1:1 ratio
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_substitute_pair UNIQUE(original_ingredient_id, substitute_ingredient_id)
);

-- =============================================================================
-- 7. CUISINES, COOKING TECHNIQUES & RECIPES TABLES
-- =============================================================================

CREATE TABLE cuisines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    region VARCHAR(100),
    description TEXT
);

CREATE TABLE recipe_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE cooking_techniques (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    flavor_impact_multiplier JSONB -- Impact on Pyrazines, Smokiness, Maillard, etc.
);

CREATE TABLE recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    cuisine_id UUID REFERENCES cuisines(id) ON DELETE SET NULL,
    category_id UUID REFERENCES recipe_categories(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    prep_time_minutes INT NOT NULL DEFAULT 0,
    cook_time_minutes INT NOT NULL DEFAULT 0,
    servings INT NOT NULL DEFAULT 2,
    difficulty difficulty_level_enum NOT NULL DEFAULT 'intermediate',
    aggregate_flavor_vector vector(64) NOT NULL,
    synergy_score NUMERIC(5,2) NOT NULL DEFAULT 85.00,
    instructions JSONB NOT NULL, -- Array of step strings or objects
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE recipe_ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
    quantity NUMERIC(10,2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    role ingredient_role_enum NOT NULL DEFAULT 'base',
    notes VARCHAR(255),
    CONSTRAINT unique_recipe_ingredient UNIQUE(recipe_id, ingredient_id)
);

CREATE TABLE recipe_techniques (
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    technique_id UUID REFERENCES cooking_techniques(id) ON DELETE CASCADE,
    PRIMARY KEY (recipe_id, technique_id)
);

-- =============================================================================
-- 8. RECIPE MEDIA (VIDEOS & AUDIO)
-- =============================================================================

CREATE TABLE recipe_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    media_type media_type_enum NOT NULL,
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    duration_seconds INT,
    title VARCHAR(255),
    transcript TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 9. USER PREFERENCES & KITCHEN INVENTORY
-- =============================================================================

CREATE TABLE user_palate_preferences (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    palate_vector vector(64) NOT NULL, -- Personal taste preference vector
    dietary_restrictions JSONB DEFAULT '[]'::jsonb, -- ['vegan', 'nut-free', etc.]
    disliked_ingredient_ids UUID[] DEFAULT '{}',
    spice_tolerance INT DEFAULT 5, -- Scale 1-10
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_inventories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
    quantity NUMERIC(10,2) NOT NULL DEFAULT 1.0,
    unit VARCHAR(50) NOT NULL DEFAULT 'pcs',
    expiration_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_inventory_item UNIQUE(user_id, ingredient_id)
);

CREATE TABLE user_favorite_recipes (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, recipe_id)
);

-- =============================================================================
-- 10. RESTAURANTS & MENU MATRIX
-- =============================================================================

CREATE TABLE restaurants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    latitude NUMERIC(10,8),
    longitude NUMERIC(11,8),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE restaurant_menus (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    menu_id UUID NOT NULL REFERENCES restaurant_menus(id) ON DELETE CASCADE,
    recipe_id UUID REFERENCES recipes(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    description TEXT,
    flavor_vector vector(64),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE restaurant_ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating NUMERIC(2,1) CHECK (rating >= 1.0 AND rating <= 5.0),
    review_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_restaurant_rating UNIQUE(restaurant_id, user_id)
);

-- =============================================================================
-- 11. REVIEWS & NOTIFICATIONS
-- =============================================================================

CREATE TABLE recipe_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating NUMERIC(2,1) CHECK (rating >= 1.0 AND rating <= 5.0),
    review_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_recipe_review UNIQUE(recipe_id, user_id)
);

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type notification_type_enum NOT NULL DEFAULT 'system_alert',
    is_read BOOLEAN DEFAULT FALSE,
    action_link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 12. SEARCH HISTORY, RECOMMENDATION LOGS & ADMIN ANALYTICS
-- =============================================================================

CREATE TABLE search_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    query_text TEXT NOT NULL,
    search_type VARCHAR(50) NOT NULL, -- 'ingredient_search', 'flavor_prompt', 'recipe_search'
    extracted_keywords JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE recommendation_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    input_ingredient_ids UUID[],
    recommended_recipe_ids UUID[],
    synergy_score NUMERIC(5,2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action_type VARCHAR(100) NOT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id UUID,
    payload_changes JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    event_name VARCHAR(100) NOT NULL, -- 'flavor_map_generated', 'substitute_clicked', 'recipe_viewed'
    event_metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 13. INDEXING STRATEGY FOR HIGH PERFORMANCE
-- =============================================================================

-- High-Dimensional Flavor Vector HNSW Indexes (Vector Cosine Similarity)
CREATE INDEX idx_ingredients_flavor_vector_hnsw 
ON ingredients USING hnsw (flavor_vector vector_cosine_ops);

CREATE INDEX idx_recipes_flavor_vector_hnsw 
ON recipes USING hnsw (aggregate_flavor_vector vector_cosine_ops);

-- Trigram Fuzzy Text Indexes for Search & Autocomplete
CREATE INDEX idx_ingredients_name_trgm ON ingredients USING gin (name gin_trgm_ops);
CREATE INDEX idx_recipes_title_trgm ON recipes USING gin (title gin_trgm_ops);

-- B-Tree Foreign Key Indexes
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_recipe_ingredients_recipe_id ON recipe_ingredients(recipe_id);
CREATE INDEX idx_recipe_ingredients_ingredient_id ON recipe_ingredients(ingredient_id);
CREATE INDEX idx_substitute_pairings_orig ON substitute_pairings(original_ingredient_id);
CREATE INDEX idx_substitute_pairings_sub ON substitute_pairings(substitute_ingredient_id);
CREATE INDEX idx_user_inventories_user_id ON user_inventories(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id, is_read);
CREATE INDEX idx_analytics_events_name ON analytics_events(event_name, created_at);
