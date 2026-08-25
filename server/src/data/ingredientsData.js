import { createFlavorVector } from '../ai/vectorSpace.js';

export const INGREDIENTS_DATA = [
  {
    id: 'ing-1',
    name: 'Paneer (Indian Cottage Cheese)',
    category: 'Dairy',
    primary_compounds: ['Lactic Acid', 'Diacetyl', 'Milk Proteins'],
    dietary_flags: ['vegetarian', 'gluten-free'],
    description: 'Fresh, non-melting cheese with a mild milky flavor, perfect for absorbing rich gravies and spices.',
    flavor_vector: createFlavorVector({
      'Richness/Fat': 8.0,
      'Creamy Note': 8.5,
      Sweetness: 3.0,
      Umami: 4.0,
      'Savory Base': 5.0
    })
  },
  {
    id: 'ing-2',
    name: 'Garam Masala',
    category: 'Spices',
    primary_compounds: ['Eugenol', 'Cinnamaldehyde', 'Piperine', 'Linalool'],
    dietary_flags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
    description: 'A warm, aromatic blend of roasted whole spices including cloves, cinnamon, cardamom, and black pepper.',
    flavor_vector: createFlavorVector({
      'Warm Spice': 10.0,
      Pungency: 7.5,
      'Eugenol (Clove/Spiced)': 9.0,
      'Roasted Note': 8.0,
      'Spicy Note': 8.5
    })
  },
  {
    id: 'ing-3',
    name: 'Ghee (Clarified Butter)',
    category: 'Oils & Fats',
    primary_compounds: ['Lactones', 'Ketones', 'Butyric Acid'],
    dietary_flags: ['vegetarian', 'gluten-free'],
    description: 'Rich, nutty clarified butter that adds deep savory fat and a caramelized aroma to traditional Indian dishes.',
    flavor_vector: createFlavorVector({
      'Richness/Fat': 10.0,
      'Nutty Note': 8.5,
      'Bake/Maillard': 7.0,
      'Creamy Note': 9.0,
      'Savory Depth': 8.5
    })
  },
  {
    id: 'ing-4',
    name: 'Kashmiri Red Chili Powder',
    category: 'Spices',
    primary_compounds: ['Capsanthin', 'Capsaicin'],
    dietary_flags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
    description: 'Vibrant red chili powder known for imparting a rich red hue with mild, slightly smoky pungency rather than intense heat.',
    flavor_vector: createFlavorVector({
      Pungency: 6.0,
      'Spicy Note': 7.5,
      Smokiness: 5.0,
      'Earthy Soil': 4.0
    })
  },
  {
    id: 'ing-5',
    name: 'Fresh Curry Leaves (Kadi Patta)',
    category: 'Herbs & Botanicals',
    primary_compounds: ['Linalool', 'Pinene', 'Caryophyllene'],
    dietary_flags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
    description: 'Highly aromatic leaves offering a distinct citrus-like, nutty, and slightly bitter herbal note when tempered in hot oil.',
    flavor_vector: createFlavorVector({
      'Herbal Note': 10.0,
      'Citrus Note': 7.5,
      Bitterness: 4.0,
      'Terpenic (Herbal/Citrus)': 9.0,
      'Nutty Note': 5.0
    })
  },
  {
    id: 'ing-6',
    name: 'Tamarind Paste',
    category: 'Fruits & Condiments',
    primary_compounds: ['Tartaric Acid', 'Furfural'],
    dietary_flags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
    description: 'Intensely sour and slightly sweet dark fruit paste, essential for acidic balance in curries and chutneys.',
    flavor_vector: createFlavorVector({
      Sourness: 10.0,
      Sweetness: 6.0,
      'Fruity Note': 7.5,
      'Caramelized Sweetness': 5.0,
      'Acidity Brightness': 9.5
    })
  },
  {
    id: 'ing-7',
    name: 'Basmati Rice',
    category: 'Grains',
    primary_compounds: ['2-Acetyl-1-pyrroline', 'Hexanal'],
    dietary_flags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
    description: 'Long-grain aromatic rice with a distinct nutty, pandan-like fragrance and fluffy texture.',
    flavor_vector: createFlavorVector({
      'Nutty Note': 8.0,
      Sweetness: 4.0,
      'Pyrazinic (Roast/Nutty)': 6.5,
      'Floral Lift': 5.0
    })
  },
  {
    id: 'ing-8',
    name: 'Mustard Seeds (Rai)',
    category: 'Spices',
    primary_compounds: ['Allyl isothiocyanate'],
    dietary_flags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
    description: 'Tiny black seeds that release a pungent, nutty, and slightly bitter flavor when popped in hot oil.',
    flavor_vector: createFlavorVector({
      Pungency: 8.5,
      'Nutty Note': 7.0,
      Bitterness: 6.0,
      'Sulfur/Thiol (Pungent/Alliaceous)': 7.5,
      'Roasted Note': 8.0
    })
  },
  {
    id: 'ing-9',
    name: 'Turmeric Powder (Haldi)',
    category: 'Spices',
    primary_compounds: ['Curcumin', 'Turmerone'],
    dietary_flags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
    description: 'Earthy, slightly bitter golden spice offering brilliant color and warm, woody undertones.',
    flavor_vector: createFlavorVector({
      Earthiness: 9.5,
      Bitterness: 6.5,
      'Woody Note': 7.0,
      'Warm Spice': 6.0
    })
  },
  {
    id: 'ing-10',
    name: 'Fresh Cilantro (Coriander Leaves)',
    category: 'Herbs & Botanicals',
    primary_compounds: ['Aliphatic aldehydes', 'Linalool'],
    dietary_flags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
    description: 'Bright, citrusy, and refreshing green herb used widely as a cooling garnish and base for chutneys.',
    flavor_vector: createFlavorVector({
      'Herbal Note': 9.5,
      'Citrus Note': 8.0,
      'Green Leaf Note': 10.0,
      'Aromatic Lift': 9.0
    })
  },
  {
    id: 'ing-11',
    name: 'Ginger Garlic Paste',
    category: 'Alliums & Roots',
    primary_compounds: ['Allicin', 'Gingerol'],
    dietary_flags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
    description: 'The foundational aromatic puree of Indian cooking, combining pungent garlic warmth with sharp, citrusy ginger heat.',
    flavor_vector: createFlavorVector({
      Pungency: 9.0,
      'Sulfur/Thiol (Pungent/Alliaceous)': 8.5,
      'Spicy Note': 8.0,
      'Citrus Note': 6.0,
      Umami: 7.0
    })
  },
  {
    id: 'ing-12',
    name: 'Coconut Milk',
    category: 'Dairy Alternatives',
    primary_compounds: ['Lactones', 'Caprylic acid'],
    dietary_flags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
    description: 'Rich, creamy tropical liquid extracted from grated coconut, bringing natural sweetness and luscious fat to coastal curries.',
    flavor_vector: createFlavorVector({
      'Richness/Fat': 9.0,
      'Creamy Note': 10.0,
      Sweetness: 7.5,
      'Nutty Note': 6.0
    })
  },
  {
    id: 'ing-13',
    name: 'Cumin Seeds (Jeera)',
    category: 'Spices',
    primary_compounds: ['Cuminaldehyde'],
    dietary_flags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
    description: 'Warm, earthy, and distinctly pungent seeds that form the savory backbone of countless Indian dishes.',
    flavor_vector: createFlavorVector({
      Earthiness: 9.0,
      'Warm Spice': 8.5,
      'Roasted Note': 8.0,
      Pungency: 7.0,
      'Savory Depth': 7.5
    })
  },
  {
    id: 'ing-14',
    name: 'Green Chilis (Hari Mirch)',
    category: 'Spices & Peppers',
    primary_compounds: ['Capsaicin', 'Hexanal'],
    dietary_flags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
    description: 'Fresh, sharp fiery peppers providing immediate upfront heat and a bright, grassy vegetable note.',
    flavor_vector: createFlavorVector({
      Pungency: 9.5,
      'Spicy Note': 9.5,
      'Green Leaf Note': 7.0,
      'Spicy Heat': 9.5
    })
  },
  {
    id: 'ing-15',
    name: 'Black Cardamom (Badi Elaichi)',
    category: 'Spices',
    primary_compounds: ['1,8-Cineole', 'Phenols'],
    dietary_flags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
    description: 'Large dried pods boasting an intense, camphor-like smokiness and dark, woody warmth used in rich meat and rice dishes.',
    flavor_vector: createFlavorVector({
      Smokiness: 9.5,
      'Wood Smoke': 9.0,
      'Warm Spice': 8.5,
      'Cineole (Camphor/Eucalyptus)': 8.0,
      Earthiness: 8.5
    })
  }
];
