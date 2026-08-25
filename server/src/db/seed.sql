-- =============================================================================
-- FLAVORMIND AI — SEED DATA FOR DEMO & PRODUCTION INITIALIZATION
-- =============================================================================

-- Seed User Categories & Roles
INSERT INTO ingredient_categories (id, name, slug, description) VALUES
('c1111111-1111-1111-1111-111111111111', 'Sweets & Cocoa', 'sweets-cocoa', 'Chocolates, honeys, sugars, and syrups'),
('c2222222-2222-2222-2222-222222222222', 'Herbs & Botanicals', 'herbs-botanicals', 'Fresh herbs and aromatic botanical leaves'),
('c3333333-3333-3333-3333-333333333333', 'Dairy & Cheese', 'dairy-cheese', 'Aged cheeses, milks, creams, and cultured dairy'),
('c4444444-4444-4444-4444-444444444444', 'Spices & Seasonings', 'spices-seasonings', 'Whole and ground aromatic spices'),
('c5555555-5555-5555-5555-555555555555', 'Citrus & Fruits', 'citrus-fruits', 'Fresh citrus fruits, juices, and zests');

-- Seed Cuisines
INSERT INTO cuisines (id, name, region, description) VALUES
('u1111111-1111-1111-1111-111111111111', 'Italian', 'Mediterranean', 'Focus on fresh high-quality simple ingredients, cheeses, pasta, and herbs'),
('u2222222-2222-2222-2222-222222222222', 'Thai', 'Southeast Asia', 'Mastery of sweet, sour, salty, bitter, and spicy balance'),
('u3333333-3333-3333-3333-333333333333', 'French Modern', 'Western Europe', 'Rich sauces, complex flavor extractions, and technical precision');

-- Seed Cooking Techniques
INSERT INTO cooking_techniques (id, name, description) VALUES
('t1111111-1111-1111-1111-111111111111', 'Pan Roasting & Searing', 'High surface temperature creating rich Maillard pyrazines and crisp texture'),
('t2222222-2222-2222-2222-222222222222', 'Cold Oil Blooming', 'Low temperature oil infusion extracting volatile eugenol and cineole terpenes');
