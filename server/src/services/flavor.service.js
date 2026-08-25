import { ingredientRepository } from '../repositories/ingredient.repository.js';
import { computeSynergyMatrix, computeFlavorSynergy, calculateCosineSimilarity } from '../ai/similarity.js';
import { findSubstitutes, analyzeFlavorBalance } from '../ai/inference.js';
import { extractFlavorFromPrompt } from '../ai/nlpExtractor.js';
import { summarizeVector, createFlavorVector } from '../ai/vectorSpace.js';

class FlavorService {
  /**
   * Forward Flavor Mapping for a list of ingredient IDs or names
   */
  async mapIngredients(ingredientIds = []) {
    const allIngredients = await ingredientRepository.getAll();
    const selected = allIngredients.filter(ing => 
      ingredientIds.includes(ing.id) || ingredientIds.map(i => i.toLowerCase()).includes(ing.name.toLowerCase())
    );

    if (selected.length === 0) {
      throw new Error('No valid ingredients selected for flavor mapping.');
    }

    const matrixData = computeSynergyMatrix(selected);
    const balanceAnalysis = analyzeFlavorBalance(selected, allIngredients);

    // Calculate overall composite synergy score
    let totalScore = 100;
    if (selected.length > 1) {
      let sum = 0;
      let pairs = 0;
      for (let i = 0; i < selected.length; i++) {
        for (let j = i + 1; j < selected.length; j++) {
          sum += computeFlavorSynergy(selected[i], selected[j]).synergyScore;
          pairs++;
        }
      }
      totalScore = Math.round(sum / pairs);
    }

    // Composite Vector Summary
    const compositeVec = new Array(64).fill(0);
    selected.forEach(ing => {
      ing.flavor_vector.forEach((val, idx) => { compositeVec[idx] += val; });
    });
    const normalizedComposite = compositeVec.map(val => val / selected.length);

    return {
      selectedIngredients: selected,
      overallSynergyScore: totalScore,
      synergyMatrix: matrixData.matrix,
      balanceAnalysis,
      topFlavorNotes: summarizeVector(normalizedComposite),
      compositeVector: normalizedComposite
    };
  }

  /**
   * Reverse Flavor Substitution for missing ingredient
   */
  async getSubstitutes(missingIngredientId, dietaryRestrictions = []) {
    const allCandidates = await ingredientRepository.getAll();
    const target = await ingredientRepository.getById(missingIngredientId);

    if (!target) {
      throw new Error(`Ingredient with ID '${missingIngredientId}' not found.`);
    }

    const substitutes = findSubstitutes(target, allCandidates, dietaryRestrictions);

    return {
      missingIngredient: target,
      targetSummary: summarizeVector(target.flavor_vector),
      substitutes
    };
  }

  /**
   * Natural Language Conversational Prompt Analyzer
   */
  async processAiPrompt(promptText = '') {
    const extracted = extractFlavorFromPrompt(promptText);
    const targetVector = createFlavorVector(extracted.targetDescriptorMap);
    const allIngredients = await ingredientRepository.getAll();

    // Match ingredients closest to target vector
    const matchedIngredients = allIngredients.map(ing => ({
      ingredient: ing,
      similarity: calculateCosineSimilarity(targetVector, ing.flavor_vector)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 6);

    return {
      promptAnalysis: extracted,
      targetProfileSummary: summarizeVector(targetVector),
      topMatchedIngredients: matchedIngredients.map(m => ({
        ...m.ingredient,
        similarityMatchPercentage: Math.round(m.similarity * 100)
      }))
    };
  }
}

export const flavorService = new FlavorService();
