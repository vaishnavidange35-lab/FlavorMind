/**
 * FlavorMind AI — Rule-Based Culinary Inference Engine
 */

import { calculateCosineSimilarity, computeFlavorSynergy } from './similarity.js';

/**
 * Evaluates dietary restrictions compliance
 */
export function isDietaryCompliant(ingredient, dietaryRestrictions = []) {
  if (!dietaryRestrictions || dietaryRestrictions.length === 0) return true;
  
  const flags = ingredient.dietary_flags || [];
  const lowerRestrictions = dietaryRestrictions.map(r => r.toLowerCase());
  
  for (const restriction of lowerRestrictions) {
    if (restriction === 'vegan' && !flags.includes('vegan')) return false;
    if (restriction === 'vegetarian' && !flags.includes('vegetarian')) return false;
    if (restriction === 'gluten-free' && !flags.includes('gluten-free')) return false;
    if (restriction === 'dairy-free' && !flags.includes('dairy-free')) return false;
    if (restriction === 'nut-free' && flags.includes('contains-nuts')) return false;
  }
  
  return true;
}

/**
 * Finds top N optimal flavor substitutes for a missing ingredient
 */
export function findSubstitutes(missingIngredient, candidateIngredients = [], dietaryRestrictions = []) {
  if (!missingIngredient || !candidateIngredients || candidateIngredients.length === 0) {
    return [];
  }
  
  const targetVec = missingIngredient.flavor_vector;
  const filtered = candidateIngredients.filter(candidate => 
    candidate.id !== missingIngredient.id && isDietaryCompliant(candidate, dietaryRestrictions)
  );

  const scored = filtered.map(candidate => {
    const sim = calculateCosineSimilarity(targetVec, candidate.flavor_vector);
    const synergy = computeFlavorSynergy(missingIngredient, candidate);
    
    // Weighted match score combining direct vector match and chemical synergy
    const matchScore = Math.round((sim * 0.7 + (synergy.synergyScore / 100) * 0.3) * 100);
    
    return {
      ingredient: {
        id: candidate.id,
        name: candidate.name,
        category: candidate.category,
        dietary_flags: candidate.dietary_flags,
        description: candidate.description
      },
      matchScore,
      cosineSimilarity: sim,
      synergyRating: synergy.complementaryRating,
      sharedCompounds: synergy.sharedCompounds,
      substitutionAdvice: `Substitute ${candidate.name} in a 1:1 ratio for comparable ${candidate.category} notes.`
    };
  });

  scored.sort((a, b) => b.matchScore - a.matchScore);
  return scored.slice(0, 5);
}

/**
 * Analyzes an ingredient collection for balance gaps and suggests balancing elements
 */
export function analyzeFlavorBalance(selectedIngredients = [], allCandidates = []) {
  if (selectedIngredients.length === 0) return { balanced: true, recommendations: [] };

  // Calculate composite flavor vector sum
  const compositeVec = new Array(64).fill(0);
  selectedIngredients.forEach(ing => {
    if (ing.flavor_vector) {
      ing.flavor_vector.forEach((val, idx) => {
        compositeVec[idx] += val;
      });
    }
  });

  // Normalize composite vector
  const len = selectedIngredients.length;
  const avgVec = compositeVec.map(v => v / len);

  const sweet = avgVec[0];  // Sweetness
  const umami = avgVec[1];  // Umami
  const salty = avgVec[2];  // Saltiness
  const sour = avgVec[3];   // Sourness
  const bitter = avgVec[4]; // Bitterness

  const gaps = [];

  if (sour > 0.6 && sweet < 0.2) {
    gaps.push({ dimension: 'Sweetness', message: 'High acidity detected. Consider balancing with a sweet/caramelized element.' });
  }
  if (bitter > 0.5 && umami < 0.2) {
    gaps.push({ dimension: 'Umami', message: 'Bitter profile requires savory/umami depth to round out harsh notes.' });
  }
  if (salty > 0.7 && sour < 0.2) {
    gaps.push({ dimension: 'Acidity Brightness', message: 'Heavy salty palate needs citrus or acidic lift.' });
  }
  if (sweet > 0.7 && sour < 0.2) {
    gaps.push({ dimension: 'Sourness', message: 'Profile is overly sweet; add a crisp acidic agent (Lemon, Vinegar, Lime).' });
  }

  // Find next best complementary ingredient suggestions
  const suggestions = allCandidates
    .filter(cand => !selectedIngredients.some(s => s.id === cand.id))
    .map(cand => {
      const avgSynergy = selectedIngredients.reduce((acc, curr) => acc + computeFlavorSynergy(curr, cand).synergyScore, 0) / len;
      return {
        ingredient: cand,
        avgSynergy: Math.round(avgSynergy)
      };
    })
    .sort((a, b) => b.avgSynergy - a.avgSynergy)
    .slice(0, 4);

  return {
    balanced: gaps.length === 0,
    gaps,
    compositeProfile: {
      sweet: Math.round(sweet * 100),
      umami: Math.round(umami * 100),
      salty: Math.round(salty * 100),
      sour: Math.round(sour * 100),
      bitter: Math.round(bitter * 100)
    },
    suggestedComplements: suggestions
  };
}
