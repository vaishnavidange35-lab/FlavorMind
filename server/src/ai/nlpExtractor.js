/**
 * FlavorMind AI — Natural Language Flavor Descriptor & Query Extractor (Multilingual)
 */

const KEYWORD_FLAVOR_MAP = {
  // English
  smoky: { Smokiness: 9.0, 'Woody Note': 7.5, 'Phenolic (Smoky/Clove)': 8.5 },
  citrus: { Sourness: 8.5, 'Citrus Note': 9.5, 'Citral (Lemon/Zest)': 9.0 },
  lemon: { Sourness: 9.0, 'Citrus Note': 10.0, 'Citral (Lemon/Zest)': 10.0 },
  spicy: { Pungency: 9.5, 'Spicy Note': 9.0, 'Pungent Spice': 9.5 },
  sweet: { Sweetness: 9.0, 'Caramelized Sweetness': 8.0 },
  caramel: { Sweetness: 9.5, 'Ketones (Butter/Caramel)': 9.0, 'Bake/Maillard': 8.5 },
  umami: { Umami: 10.0, 'Savory Depth': 9.5, 'Umami Synergy': 10.0 },
  savory: { Umami: 9.0, 'Savory Depth': 9.0 },
  creamy: { 'Richness/Fat': 8.5, 'Creamy Note': 9.0, 'Velvety Mouthfeel': 9.0 },
  herbal: { 'Herbal Note': 9.5, 'Terpenic (Herbal/Citrus)': 9.0 },
  earthy: { Earthiness: 9.0, 'Earthy Soil': 8.5 },
  floral: { 'Floral Note': 9.5, 'Linalool (Floral/Lavender)': 9.0 },
  nutty: { 'Nutty Note': 9.0, 'Pyrazinic (Roast/Nutty)': 8.5, 'Nutty Toast': 9.0 },
  bitter: { Bitterness: 9.0, 'Bittersweet Contrast': 8.5 },
  roasted: { 'Roasted Note': 9.0, 'Deep Roast': 9.0, 'Bake/Maillard': 9.0 },

  // Spanish (Español)
  ahumado: { Smokiness: 9.0, 'Woody Note': 7.5 },
  citrico: { Sourness: 8.5, 'Citrus Note': 9.5 },
  limon: { Sourness: 9.0, 'Citrus Note': 10.0 },
  picante: { Pungency: 9.5, 'Spicy Note': 9.0 },
  dulce: { Sweetness: 9.0, 'Caramelized Sweetness': 8.0 },
  sabroso: { Umami: 9.0, 'Savory Depth': 9.0 },
  cremoso: { 'Richness/Fat': 8.5, 'Creamy Note': 9.0 },
  hierbas: { 'Herbal Note': 9.5 },
  terroso: { Earthiness: 9.0, 'Earthy Soil': 8.5 },
  amargo: { Bitterness: 9.0 },
  asado: { 'Roasted Note': 9.0 },

  // French (Français)
  fumé: { Smokiness: 9.0, 'Woody Note': 7.5 },
  citron: { Sourness: 9.0, 'Citrus Note': 10.0 },
  épicé: { Pungency: 9.5, 'Spicy Note': 9.0 },
  doux: { Sweetness: 9.0 },
  sucré: { Sweetness: 9.0, 'Caramelized Sweetness': 8.0 },
  crémeux: { 'Richness/Fat': 8.5, 'Creamy Note': 9.0 },
  herbacé: { 'Herbal Note': 9.5 },
  amer: { Bitterness: 9.0 },
  rôti: { 'Roasted Note': 9.0 },

  // Hindi (हिंदी - Transliterated)
  khatta: { Sourness: 8.5, 'Citrus Note': 7.0 }, // Sour
  nimbu: { Sourness: 9.0, 'Citrus Note': 10.0 }, // Lemon
  teekha: { Pungency: 9.5, 'Spicy Note': 9.0 }, // Spicy
  masaledar: { Pungency: 8.0, 'Spicy Note': 9.5, 'Savory Depth': 8.0 }, // Spiced
  meetha: { Sweetness: 9.0 }, // Sweet
  kadwa: { Bitterness: 9.0 }, // Bitter
  malai: { 'Richness/Fat': 9.0, 'Creamy Note': 9.5 }, // Creamy
  bhuna: { 'Roasted Note': 9.5, 'Deep Roast': 9.0 }, // Roasted

  // Italian (Italiano)
  affumicato: { Smokiness: 9.0 },
  limone: { Sourness: 9.0, 'Citrus Note': 10.0 },
  piccante: { Pungency: 9.5, 'Spicy Note': 9.0 },
  dolce: { Sweetness: 9.0 },
  cremoso_it: { 'Richness/Fat': 8.5, 'Creamy Note': 9.0 }, // Avoiding duplicate key issue by regexing base
};

/**
 * Extracts target vector profile from a text prompt robustly.
 * Handles minor typos via Levenshtein-inspired substring matching.
 */
export function extractFlavorFromPrompt(promptText = '') {
  // Normalize text: remove accents/diacritics, lowercase, remove punctuation
  const normalizedText = promptText
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ");

  const words = normalizedText.split(/\s+/);
  const matchedDescriptors = [];
  const targetMap = {};

  // Map keys without accents for robust matching
  const dictionary = Object.entries(KEYWORD_FLAVOR_MAP).map(([key, map]) => ({
    key: key.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    map,
    originalKey: key
  }));

  for (const word of words) {
    if (word.length < 3) continue; // Ignore tiny words

    for (const entry of dictionary) {
      // Fuzzy matching: Exact match OR word contains the key OR key contains the word (if long enough)
      if (word === entry.key || 
          (word.length >= 4 && entry.key.includes(word)) || 
          (entry.key.length >= 4 && word.includes(entry.key))) {
        
        if (!matchedDescriptors.includes(entry.originalKey)) {
          matchedDescriptors.push(entry.originalKey);
          for (const [dim, val] of Object.entries(entry.map)) {
            targetMap[dim] = Math.max(targetMap[dim] || 0, val);
          }
        }
      }
    }
  }

  // If no specific flavors found, provide a neutral balanced vector
  if (Object.keys(targetMap).length === 0) {
    targetMap['Savory Depth'] = 5.0; // Fallback neutral baseline
  }

  return {
    rawPrompt: promptText,
    extractedKeywords: matchedDescriptors,
    targetDescriptorMap: targetMap
  };
}
