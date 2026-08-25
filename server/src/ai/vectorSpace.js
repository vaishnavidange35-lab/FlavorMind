/**
 * FlavorMind AI — 64-Dimensional Flavor Vector Space Definition
 * 
 * Dimensions 0-9: Primary Sensory Tastes (Sweet, Umami, Salty, Sour, Bitter, Pungency, Astringency, Fat/Richness, Smoky, Earthy)
 * Dimensions 10-24: Aromatic Chemical Families (Terpenes, Esters, Pyrazines, Aldehydes, Phenols, Lactones, Thiol/Sulfurs, Methoxypyrazines, Eugenols, Linalool, Cineole, Citral, Vanillin, Aliphatics, Ketones)
 * Dimensions 25-39: Culinary Flavor Notes (Herbal, Floral, Woody, Citrus, Nutty, Spicy, Roasted, Fruity, Creamy, Sulfury, Fermented, Green, Minty, Resinous, Pungent Spice)
 * Dimensions 40-63: Textural, Culinary Role, & Pair Affinity Descriptors
 */

export const FLAVOR_DIMENSIONS = [
  // Primary Tastes (0-9)
  'Sweetness', 'Umami', 'Saltiness', 'Sourness', 'Bitterness', 
  'Pungency', 'Astringency', 'Richness/Fat', 'Smokiness', 'Earthiness',
  
  // Chemical Aromatics (10-24)
  'Terpenic (Herbal/Citrus)', 'Esteric (Fruity/Sweet)', 'Pyrazinic (Roast/Nutty)', 
  'Aldehydic (Green/Fresh)', 'Phenolic (Smoky/Clove)', 'Lactonic (Coconut/Cream)', 
  'Sulfur/Thiol (Pungent/Alliaceous)', 'Methoxypyrazine (Grassy/Bell Pepper)', 'Eugenol (Clove/Spiced)', 
  'Linalool (Floral/Lavender)', 'Cineole (Camphor/Eucalyptus)', 'Citral (Lemon/Zest)', 
  'Vanillin (Vanilla/Sweet Wood)', 'Aliphatic (Fat/Dairy)', 'Ketones (Butter/Caramel)',
  
  // Sensory Descriptors (25-39)
  'Herbal Note', 'Floral Note', 'Woody Note', 'Citrus Note', 'Nutty Note', 
  'Spicy Note', 'Roasted Note', 'Fruity Note', 'Creamy Note', 'Sulfury Note', 
  'Fermented Note', 'Green Leaf Note', 'Minty/Cooling', 'Resinous', 'Warm Spice',

  // Culinary Roles & Balance Metrics (40-63)
  'Acidity Brightness', 'Savory Depth', 'Bittersweet Contrast', 'Caramelized Sweetness',
  'Pungent Bite', 'Aromatic Lift', 'Tannic Grip', 'Velvety Mouthfeel', 'Fresh Zest',
  'Deep Roast', 'Umami Synergy', 'Cooling Relief', 'Bake/Maillard', 'Fermentation Funk',
  'Floral Lift', 'Wood Smoke', 'Herbaceous Resin', 'Nutty Toast', 'Tangy Ferment',
  'Spicy Heat', 'Creamy Coating', 'Zesty Spark', 'Earthy Soil', 'Savory Base'
];

/**
 * Creates a normalized 64-dimensional vector from key-value pairs or arrays
 */
export function createFlavorVector(descriptorMap = {}) {
  const vec = new Array(64).fill(0.0);
  
  for (const [key, value] of Object.entries(descriptorMap)) {
    const idx = typeof key === 'number' ? key : FLAVOR_DIMENSIONS.findIndex(d => d.toLowerCase().includes(key.toLowerCase()));
    if (idx >= 0 && idx < 64) {
      vec[idx] = Math.min(Math.max(parseFloat(value) || 0.0, 0.0), 10.0);
    }
  }

  // Normalize vector to unit length
  const magnitude = Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
  if (magnitude > 0) {
    return vec.map(val => val / magnitude);
  }
  return vec;
}

/**
 * Summarizes a 64-D vector into top 5 primary flavor notes for UI display
 */
export function summarizeVector(vector) {
  if (!Array.isArray(vector) || vector.length !== 64) {
    return [];
  }
  
  const indexed = vector.map((val, idx) => ({ dimension: FLAVOR_DIMENSIONS[idx], score: val, idx }));
  indexed.sort((a, b) => b.score - a.score);
  
  return indexed.slice(0, 5).map(item => ({
    name: item.dimension,
    intensity: Math.round(item.score * 100) / 10,
    normalized: item.score
  }));
}
