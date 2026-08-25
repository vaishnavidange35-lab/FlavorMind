/**
 * FlavorMind AI — Cosine Similarity & Vector Math Engine
 */

/**
 * Calculates dot product of two vectors
 */
export function dotProduct(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let sum = 0;
  for (let i = 0; i < vecA.length; i++) {
    sum += vecA[i] * vecB[i];
  }
  return sum;
}

/**
 * Calculates magnitude (L2 Norm) of a vector
 */
export function magnitude(vec) {
  if (!vec) return 0;
  return Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
}

/**
 * Cosine Similarity between two 64-D vectors
 * Result ranges from -1.0 to 1.0 (or 0.0 to 1.0 for positive flavor vectors)
 */
export function calculateCosineSimilarity(vecA, vecB) {
  const magA = magnitude(vecA);
  const magB = magnitude(vecB);
  if (magA === 0 || magB === 0) return 0;
  
  const dot = dotProduct(vecA, vecB);
  const sim = dot / (magA * magB);
  return Math.max(0, Math.min(1, sim));
}

/**
 * Calculates chemical compound overlap index (Shared volatile compounds)
 */
export function calculateSharedCompoundIndex(compoundsA = [], compoundsB = []) {
  if (!Array.isArray(compoundsA) || !Array.isArray(compoundsB) || compoundsA.length === 0 || compoundsB.length === 0) {
    return 0.5; // default fallback neutral overlap
  }
  const setB = new Set(compoundsB.map(c => c.toLowerCase()));
  const matches = compoundsA.filter(c => setB.has(c.toLowerCase())).length;
  const totalUnique = new Set([...compoundsA.map(c => c.toLowerCase()), ...compoundsB.map(c => c.toLowerCase())]).size;
  
  return totalUnique > 0 ? matches / totalUnique : 0;
}

/**
 * Computes Flavor Synergy Score between two ingredients
 * Formula: Synergy = alpha * CosineSim + beta * SharedCompounds - gamma * IntensityImbalance
 */
export function computeFlavorSynergy(ingredientA, ingredientB) {
  const vecA = ingredientA.flavor_vector;
  const vecB = ingredientB.flavor_vector;
  
  const cosineSim = calculateCosineSimilarity(vecA, vecB);
  const compoundOverlap = calculateSharedCompoundIndex(ingredientA.primary_compounds, ingredientB.primary_compounds);
  
  // Imbalance penalty (e.g. Garlic overpower vs delicate Vanilla)
  const magA = magnitude(vecA);
  const magB = magnitude(vecB);
  const imbalancePenalty = Math.abs(magA - magB) * 0.15;
  
  const alpha = 0.60;
  const beta = 0.30;
  
  const rawScore = (alpha * cosineSim) + (beta * compoundOverlap) - imbalancePenalty;
  
  // Normalized percentage 0-100%
  const percentage = Math.min(100, Math.max(0, Math.round(rawScore * 100)));
  
  return {
    synergyScore: percentage,
    cosineSimilarity: Math.round(cosineSim * 1000) / 1000,
    compoundOverlapScore: Math.round(compoundOverlap * 1000) / 1000,
    complementaryRating: percentage >= 85 ? 'Exceptional Harmony' : percentage >= 70 ? 'High Synergy' : percentage >= 55 ? 'Balanced Pair' : 'Experimental / Contrast',
    sharedCompounds: (ingredientA.primary_compounds || []).filter(c => 
      (ingredientB.primary_compounds || []).map(x => x.toLowerCase()).includes(c.toLowerCase())
    )
  };
}

/**
 * Computes N x N Synergy Matrix for a set of ingredients
 */
export function computeSynergyMatrix(ingredients = []) {
  const n = ingredients.length;
  const matrix = Array.from({ length: n }, () => new Array(n).fill(0));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        matrix[i][j] = 100;
      } else {
        const pairing = computeFlavorSynergy(ingredients[i], ingredients[j]);
        matrix[i][j] = pairing.synergyScore;
      }
    }
  }
  
  return {
    matrix,
    ingredients: ingredients.map(ing => ({ id: ing.id, name: ing.name, category: ing.category }))
  };
}
