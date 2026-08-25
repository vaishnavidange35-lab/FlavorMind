export const RECIPES_DATA = [
  {
    id: 'rec-1',
    title: 'Smoky Paneer Butter Masala',
    category: 'North Indian & Curries',
    prep_time: 20,
    cook_time: 30,
    servings: 4,
    synergy_score: 96,
    tags: ['paneer', 'butter masala', 'makhani', 'cheese', 'tomato', 'smoky', 'curry', 'north indian', 'vegetarian'],
    description: 'A rich, luscious tomato and cashew-based curry enveloping soft cubes of paneer, kissed with the camphor warmth of black cardamom and finished with creamy butter and crushed kasuri methi (fenugreek).',
    ingredients: [
      { id: 'ing-1', name: 'Paneer', quantity: '400', unit: 'g', role: 'base' },
      { id: 'ing-3', name: 'Ghee', quantity: '2', unit: 'tbsp', role: 'base' },
      { id: 'ing-2', name: 'Garam Masala', quantity: '1', unit: 'tsp', role: 'accent' },
      { id: 'ing-4', name: 'Kashmiri Red Chili Powder', quantity: '2', unit: 'tsp', role: 'accent' },
      { id: 'ing-11', name: 'Ginger Garlic Paste', quantity: '1', unit: 'tbsp', role: 'base' },
      { id: 'ing-15', name: 'Black Cardamom', quantity: '1', unit: 'pod', role: 'complement' }
    ],
    instructions: [
      'Melt ghee in a heavy-bottomed pan and lightly fry the black cardamom to release its smoky essential oils.',
      'Sauté ginger garlic paste until the raw smell disappears, then add pureed tomatoes and cook until oil separates.',
      'Stir in Kashmiri chili powder for color and Garam Masala for warmth.',
      'Blend cashew paste and a splash of cream into the gravy to create a velvety mouthfeel.',
      'Gently fold in paneer cubes and simmer for 5 minutes. Garnish with fresh cilantro.'
    ],
    flavor_highlights: ['Velvety Creaminess', 'Warm Clove Spice', 'Subtle Smoky Campfire', 'Deep Savory Fat']
  },
  {
    id: 'rec-2',
    title: 'South Indian Tamarind Coconut Curry (Meen Kulambu Style)',
    category: 'South Indian & Coastal',
    prep_time: 15,
    cook_time: 25,
    servings: 3,
    synergy_score: 92,
    tags: ['meen kulambu', 'fish curry', 'tamarind', 'coconut', 'south indian', 'coastal', 'kerala', 'tamil nadu', 'sour'],
    description: 'A deeply tangy and aromatic coastal curry balancing the sharp acidity of tamarind with the cooling richness of coconut milk, elevated by the nutty crackle of mustard seeds and fresh curry leaves.',
    ingredients: [
      { id: 'ing-12', name: 'Coconut Milk', quantity: '1', unit: 'cup', role: 'base' },
      { id: 'ing-6', name: 'Tamarind Paste', quantity: '2', unit: 'tbsp', role: 'base' },
      { id: 'ing-8', name: 'Mustard Seeds', quantity: '1', unit: 'tsp', role: 'accent' },
      { id: 'ing-5', name: 'Fresh Curry Leaves', quantity: '15', unit: 'leaves', role: 'complement' },
      { id: 'ing-9', name: 'Turmeric Powder', quantity: '0.5', unit: 'tsp', role: 'accent' },
      { id: 'ing-14', name: 'Green Chilis', quantity: '2', unit: 'pcs', role: 'accent' }
    ],
    instructions: [
      'Heat oil in a wok and drop in mustard seeds. Wait for them to pop and release their nutty aroma.',
      'Add fresh curry leaves and slit green chilis; stand back as they crackle and impart a citrusy, herbal fragrance.',
      'Pour in tamarind extract and turmeric, bringing to a rapid boil to cook off raw acidity.',
      'Lower the heat completely and gently whisk in the thick coconut milk to prevent splitting.',
      'Simmer gently for 5 minutes until the fat from the coconut milk forms a glossy sheen on top.'
    ],
    flavor_highlights: ['Bright Tamarind Sourness', 'Tropical Coconut Fat', 'Nutty Mustard Pop', 'Herbal Citrus Lift']
  },
  {
    id: 'rec-3',
    title: 'Aromatic Hyderabadi Dum Biryani',
    category: 'Rice & Biryani',
    prep_time: 45,
    cook_time: 40,
    servings: 6,
    synergy_score: 98,
    tags: ['biryani', 'hyderabadi', 'rice', 'dum', 'chicken', 'mutton', 'chawal', 'spicy', 'mughlai'],
    description: 'The crown jewel of Indian cuisine. Long-grain basmati rice layered with deeply spiced, yogurt-marinated proteins, slow-cooked in a sealed pot (dum) to trap the heady aromas of ghee, mint, and garam masala.',
    ingredients: [
      { id: 'ing-7', name: 'Basmati Rice', quantity: '2', unit: 'cups', role: 'base' },
      { id: 'ing-3', name: 'Ghee', quantity: '4', unit: 'tbsp', role: 'base' },
      { id: 'ing-2', name: 'Garam Masala', quantity: '2', unit: 'tsp', role: 'accent' },
      { id: 'ing-11', name: 'Ginger Garlic Paste', quantity: '2', unit: 'tbsp', role: 'base' },
      { id: 'ing-15', name: 'Black Cardamom', quantity: '2', unit: 'pods', role: 'complement' },
      { id: 'ing-10', name: 'Fresh Cilantro', quantity: '0.5', unit: 'cup', role: 'accent' }
    ],
    instructions: [
      'Wash and soak basmati rice for 30 minutes. Parboil with whole spices (including black cardamom) until 70% cooked.',
      'Prepare a robust marinade using yogurt, ginger garlic paste, and garam masala, layering it at the bottom of a heavy-bottomed pot.',
      'Layer the parboiled rice over the marinade. Drizzle generously with melted ghee, saffron milk, and fresh cilantro.',
      'Seal the pot tightly with dough or foil to trap the steam (Dum process) and cook on very low heat for 30 minutes.',
      'Open the seal to release an intoxicating cloud of spice and ghee aromas before gently fluffing the rice.'
    ],
    flavor_highlights: ['Pandan-like Nutty Rice', 'Deep Ghee Richness', 'Complex Clove/Cinnamon Spice', 'Smoky Cardamom Notes']
  },
  {
    id: 'rec-4',
    title: 'Crispy Masala Dosa with Coconut Chutney',
    category: 'South Indian & Breakfast',
    prep_time: 30,
    cook_time: 15,
    servings: 4,
    synergy_score: 93,
    tags: ['dosa', 'masala dosa', 'crepe', 'south indian', 'chutney', 'breakfast', 'vegetarian', 'crispy'],
    description: 'Paper-thin fermented rice and lentil crepe, golden-fried in ghee, stuffed with spiced potato masala, and served with freshly ground coconut chutney.',
    ingredients: [
      { id: 'ing-3', name: 'Ghee', quantity: '2', unit: 'tbsp', role: 'base' },
      { id: 'ing-8', name: 'Mustard Seeds', quantity: '1', unit: 'tsp', role: 'accent' },
      { id: 'ing-5', name: 'Fresh Curry Leaves', quantity: '10', unit: 'leaves', role: 'complement' },
      { id: 'ing-9', name: 'Turmeric Powder', quantity: '0.5', unit: 'tsp', role: 'accent' },
      { id: 'ing-14', name: 'Green Chilis', quantity: '3', unit: 'pcs', role: 'accent' },
      { id: 'ing-12', name: 'Coconut Milk', quantity: '0.5', unit: 'cup', role: 'base' }
    ],
    instructions: [
      'Prepare dosa batter by soaking rice and urad dal, then grinding and fermenting overnight.',
      'Make potato masala by tempering mustard seeds and curry leaves in ghee, adding turmeric and mashed potatoes.',
      'Spread a thin ladle of batter on a hot tawa in a circular motion, drizzle ghee on edges.',
      'Place spiced potato filling inside and fold into a golden crispy cylinder.',
      'Serve with freshly ground coconut chutney and sambar.'
    ],
    flavor_highlights: ['Crispy Fermented Batter', 'Nutty Mustard Crackle', 'Herbal Curry Leaf', 'Creamy Coconut']
  },
  {
    id: 'rec-5',
    title: 'Rich Palak Paneer (Spinach & Cottage Cheese)',
    category: 'North Indian & Curries',
    prep_time: 15,
    cook_time: 25,
    servings: 3,
    synergy_score: 94,
    tags: ['palak paneer', 'spinach', 'cheese', 'green curry', 'north indian', 'punjabi', 'vegetarian', 'healthy'],
    description: 'Velvety blanched spinach puree enriched with cream and cumin, studded with soft golden-fried paneer cubes and a tadka of ghee and garlic.',
    ingredients: [
      { id: 'ing-1', name: 'Paneer', quantity: '300', unit: 'g', role: 'base' },
      { id: 'ing-3', name: 'Ghee', quantity: '2', unit: 'tbsp', role: 'base' },
      { id: 'ing-13', name: 'Cumin Seeds', quantity: '1', unit: 'tsp', role: 'accent' },
      { id: 'ing-11', name: 'Ginger Garlic Paste', quantity: '1', unit: 'tbsp', role: 'base' },
      { id: 'ing-2', name: 'Garam Masala', quantity: '0.5', unit: 'tsp', role: 'accent' },
      { id: 'ing-14', name: 'Green Chilis', quantity: '2', unit: 'pcs', role: 'accent' }
    ],
    instructions: [
      'Blanch fresh spinach leaves in boiling water for 2 minutes, then ice-bath and blend into a smooth puree.',
      'Heat ghee, crackle cumin seeds, then sauté ginger garlic paste and green chilis until fragrant.',
      'Pour in the spinach puree and simmer with garam masala and a pinch of sugar to cut bitterness.',
      'Pan-fry paneer cubes until golden, then fold gently into the spinach gravy.',
      'Finish with a swirl of cream and serve with hot naan or jeera rice.'
    ],
    flavor_highlights: ['Earthy Spinach Base', 'Warm Cumin Crackle', 'Creamy Paneer', 'Ghee-Roasted Garlic']
  },
  {
    id: 'rec-6',
    title: 'Smoky Dal Tadka (Tempered Yellow Lentils)',
    category: 'North Indian & Dal',
    prep_time: 10,
    cook_time: 30,
    servings: 4,
    synergy_score: 91,
    tags: ['dal tadka', 'lentils', 'yellow dal', 'comfort food', 'north indian', 'vegetarian', 'vegan optional', 'smoky'],
    description: 'Comfort food at its finest — slow-simmered yellow lentils finished with a crackling tadka of ghee, cumin, mustard seeds, dried red chilies, and fresh curry leaves.',
    ingredients: [
      { id: 'ing-3', name: 'Ghee', quantity: '3', unit: 'tbsp', role: 'base' },
      { id: 'ing-13', name: 'Cumin Seeds', quantity: '1', unit: 'tsp', role: 'accent' },
      { id: 'ing-8', name: 'Mustard Seeds', quantity: '0.5', unit: 'tsp', role: 'accent' },
      { id: 'ing-9', name: 'Turmeric Powder', quantity: '0.5', unit: 'tsp', role: 'accent' },
      { id: 'ing-5', name: 'Fresh Curry Leaves', quantity: '8', unit: 'leaves', role: 'complement' },
      { id: 'ing-4', name: 'Kashmiri Red Chili Powder', quantity: '1', unit: 'tsp', role: 'accent' }
    ],
    instructions: [
      'Pressure cook toor dal with turmeric and water until completely soft and mushy.',
      'In a separate pan, heat ghee until smoking, then crackle cumin seeds and mustard seeds.',
      'Add curry leaves, dried red chilies, and Kashmiri chili powder to the tadka — stand back from the aromatic burst!',
      'Pour the sizzling tadka over the cooked dal and mix vigorously.',
      'Garnish with fresh cilantro and serve with steamed basmati rice or roti.'
    ],
    flavor_highlights: ['Earthy Lentil Base', 'Smoky Ghee Tadka', 'Pungent Mustard Pop', 'Warm Kashmiri Color']
  },
  {
    id: 'rec-7',
    title: 'Spicy Chole Bhature (Chickpea Curry & Fried Bread)',
    category: 'North Indian & Street Food',
    prep_time: 40,
    cook_time: 35,
    servings: 4,
    synergy_score: 95,
    tags: ['chole bhature', 'chickpeas', 'chana masala', 'punjabi', 'street food', 'spicy', 'vegetarian', 'fried bread'],
    description: 'The legendary Punjabi street food — dark, deeply spiced chickpea curry paired with puffy, golden-fried bhature bread, served with pickled onions and green chutney.',
    ingredients: [
      { id: 'ing-2', name: 'Garam Masala', quantity: '2', unit: 'tsp', role: 'accent' },
      { id: 'ing-11', name: 'Ginger Garlic Paste', quantity: '2', unit: 'tbsp', role: 'base' },
      { id: 'ing-4', name: 'Kashmiri Red Chili Powder', quantity: '2', unit: 'tsp', role: 'accent' },
      { id: 'ing-13', name: 'Cumin Seeds', quantity: '1', unit: 'tsp', role: 'accent' },
      { id: 'ing-6', name: 'Tamarind Paste', quantity: '1', unit: 'tbsp', role: 'complement' },
      { id: 'ing-15', name: 'Black Cardamom', quantity: '1', unit: 'pod', role: 'complement' }
    ],
    instructions: [
      'Soak chickpeas overnight and pressure cook with black cardamom and tea bags for a dark color.',
      'Prepare a masala base by sautéing ginger garlic paste, cumin, and Kashmiri chili in oil until deep red.',
      'Add soaked chickpeas to the masala, along with tamarind paste and garam masala.',
      'Simmer on low heat for 20 minutes, mashing a few chickpeas to thicken the gravy.',
      'Serve with freshly fried bhature (fermented dough puffed in hot oil) and sliced onions.'
    ],
    flavor_highlights: ['Deep Spiced Chickpea', 'Tangy Tamarind Bite', 'Smoky Cardamom Depth', 'Warm Garam Masala']
  },
  {
    id: 'rec-8',
    title: 'Kerala Coconut Fish Curry (Meen Moilee)',
    category: 'South Indian & Coastal',
    prep_time: 15,
    cook_time: 20,
    servings: 3,
    synergy_score: 90,
    tags: ['meen moilee', 'fish curry', 'kerala', 'coconut milk', 'seafood', 'south indian', 'mild', 'yellow curry'],
    description: 'A light yet luxurious Kerala-style fish stew simmered gently in creamy coconut milk with fresh curry leaves, green chilis, and a hint of turmeric gold.',
    ingredients: [
      { id: 'ing-12', name: 'Coconut Milk', quantity: '1.5', unit: 'cups', role: 'base' },
      { id: 'ing-5', name: 'Fresh Curry Leaves', quantity: '12', unit: 'leaves', role: 'complement' },
      { id: 'ing-9', name: 'Turmeric Powder', quantity: '0.5', unit: 'tsp', role: 'accent' },
      { id: 'ing-14', name: 'Green Chilis', quantity: '3', unit: 'pcs', role: 'accent' },
      { id: 'ing-8', name: 'Mustard Seeds', quantity: '0.5', unit: 'tsp', role: 'accent' },
      { id: 'ing-11', name: 'Ginger Garlic Paste', quantity: '1', unit: 'tbsp', role: 'base' }
    ],
    instructions: [
      'Marinate fish pieces with turmeric and salt for 15 minutes.',
      'Heat coconut oil, pop mustard seeds, add curry leaves and slit green chilis.',
      'Sauté ginger garlic paste and sliced onions until translucent.',
      'Pour in thin coconut milk first and bring to a gentle simmer, add the fish.',
      'Once fish is cooked through, pour in thick coconut milk and warm without boiling. Serve with appam or rice.'
    ],
    flavor_highlights: ['Silky Coconut Richness', 'Fresh Curry Leaf Aroma', 'Gentle Turmeric Warmth', 'Clean Fish Flavor']
  },
  {
    id: 'rec-9',
    title: 'Punjabi Butter Chicken (Murgh Makhani)',
    category: 'North Indian & Curries',
    prep_time: 30,
    cook_time: 40,
    servings: 4,
    synergy_score: 97,
    tags: ['butter chicken', 'murgh makhani', 'chicken', 'tomato', 'creamy', 'north indian', 'punjabi', 'non-veg'],
    description: 'Tender chicken marinated in yogurt and spices, roasted and then simmered in a rich, velvety tomato and butter gravy.',
    ingredients: [
      { id: 'ing-3', name: 'Ghee', quantity: '3', unit: 'tbsp', role: 'base' },
      { id: 'ing-2', name: 'Garam Masala', quantity: '1', unit: 'tsp', role: 'accent' },
      { id: 'ing-4', name: 'Kashmiri Red Chili Powder', quantity: '1', unit: 'tbsp', role: 'accent' },
      { id: 'ing-11', name: 'Ginger Garlic Paste', quantity: '2', unit: 'tbsp', role: 'base' }
    ],
    instructions: [
      'Marinate chicken pieces with yogurt, ginger garlic paste, and Kashmiri chili powder.',
      'Roast the chicken until slightly charred.',
      'Prepare the makhani sauce with pureed tomatoes, ghee, and spices.',
      'Add roasted chicken to the sauce and simmer.',
      'Finish with fresh cream and a sprinkle of Garam Masala.'
    ],
    flavor_highlights: ['Velvety Tomato Gravy', 'Smoky Roasted Chicken', 'Rich Buttery Finish']
  },
  {
    id: 'rec-10',
    title: 'Classic Aloo Gobi',
    category: 'North Indian & Dry Curries',
    prep_time: 15,
    cook_time: 25,
    servings: 4,
    synergy_score: 88,
    tags: ['aloo gobi', 'potato', 'cauliflower', 'dry curry', 'vegan', 'vegetarian', 'north indian', 'everyday'],
    description: 'A comforting, dry, spiced vegetable dish made with potatoes, cauliflower, and fragrant roasted cumin and turmeric.',
    ingredients: [
      { id: 'ing-13', name: 'Cumin Seeds', quantity: '1', unit: 'tsp', role: 'accent' },
      { id: 'ing-9', name: 'Turmeric Powder', quantity: '1', unit: 'tsp', role: 'base' },
      { id: 'ing-11', name: 'Ginger Garlic Paste', quantity: '1', unit: 'tbsp', role: 'accent' },
      { id: 'ing-14', name: 'Green Chilis', quantity: '2', unit: 'pcs', role: 'complement' },
      { id: 'ing-10', name: 'Fresh Cilantro', quantity: '0.25', unit: 'cup', role: 'accent' }
    ],
    instructions: [
      'Heat oil and splutter cumin seeds and green chilis.',
      'Add ginger garlic paste and sauté until raw smell disappears.',
      'Toss in diced potatoes and cauliflower florets with turmeric and salt.',
      'Cover and cook on low heat until vegetables are tender.',
      'Garnish with fresh cilantro before serving.'
    ],
    flavor_highlights: ['Earthy Turmeric', 'Warm Cumin', 'Fresh Coriander Lift']
  },
  {
    id: 'rec-11',
    title: 'South Indian Sambar',
    category: 'South Indian & Stews',
    prep_time: 20,
    cook_time: 30,
    servings: 6,
    synergy_score: 95,
    tags: ['sambar', 'lentils', 'stew', 'tamarind', 'south indian', 'vegan', 'vegetarian', 'healthy'],
    description: 'A robust and tangy lentil stew loaded with vegetables, flavored with tamarind and a special roasted spice blend.',
    ingredients: [
      { id: 'ing-6', name: 'Tamarind Paste', quantity: '2', unit: 'tbsp', role: 'base' },
      { id: 'ing-8', name: 'Mustard Seeds', quantity: '1', unit: 'tsp', role: 'accent' },
      { id: 'ing-5', name: 'Fresh Curry Leaves', quantity: '15', unit: 'leaves', role: 'complement' },
      { id: 'ing-9', name: 'Turmeric Powder', quantity: '0.5', unit: 'tsp', role: 'accent' }
    ],
    instructions: [
      'Cook pigeon peas (toor dal) with turmeric until mushy.',
      'Boil mixed vegetables with tamarind extract until soft.',
      'Mix the cooked dal and vegetables with Sambar powder and simmer.',
      'Prepare a tadka with mustard seeds and curry leaves in ghee or oil.',
      'Pour the sizzling tadka over the sambar.'
    ],
    flavor_highlights: ['Tangy Tamarind', 'Earthy Lentils', 'Aromatic Curry Leaves']
  },
  {
    id: 'rec-12',
    title: 'Comforting Rajma Chawal',
    category: 'North Indian & Curries',
    prep_time: 15,
    cook_time: 45,
    servings: 4,
    synergy_score: 92,
    tags: ['rajma', 'kidney beans', 'chawal', 'rice', 'comfort food', 'punjabi', 'vegetarian', 'vegan optional'],
    description: 'A deeply comforting North Indian classic of red kidney beans slow-cooked in an onion-tomato gravy, served over steaming basmati rice.',
    ingredients: [
      { id: 'ing-7', name: 'Basmati Rice', quantity: '1.5', unit: 'cups', role: 'base' },
      { id: 'ing-11', name: 'Ginger Garlic Paste', quantity: '1', unit: 'tbsp', role: 'base' },
      { id: 'ing-2', name: 'Garam Masala', quantity: '1', unit: 'tsp', role: 'accent' },
      { id: 'ing-13', name: 'Cumin Seeds', quantity: '1', unit: 'tsp', role: 'complement' }
    ],
    instructions: [
      'Soak kidney beans overnight and pressure cook until tender.',
      'Sauté cumin seeds, finely chopped onions, and ginger garlic paste until golden brown.',
      'Add pureed tomatoes and spices, cooking until oil separates.',
      'Add the boiled kidney beans and simmer for 15-20 minutes to absorb flavors.',
      'Serve hot over freshly steamed basmati rice.'
    ],
    flavor_highlights: ['Hearty Bean Texture', 'Savory Tomato Gravy', 'Fragrant Basmati Rice']
  },
  {
    id: 'rec-13',
    title: 'Masala Chai',
    category: 'Beverages',
    prep_time: 5,
    cook_time: 10,
    servings: 2,
    synergy_score: 99,
    tags: ['chai', 'tea', 'beverage', 'spiced', 'milk', 'sweet', 'everyday'],
    description: 'The quintessential Indian spiced milk tea, brewed strongly with black tea leaves, crushed ginger, cardamom, and a touch of sweetness.',
    ingredients: [
      { id: 'ing-11', name: 'Ginger Garlic Paste', quantity: '0.5', unit: 'tsp', role: 'accent' }, 
      { id: 'ing-15', name: 'Black Cardamom', quantity: '1', unit: 'pod', role: 'accent' }
    ],
    instructions: [
      'Boil water with crushed ginger and cardamom (or use a pinch of Garam Masala in a pinch!).',
      'Add strong black tea leaves and simmer for 2 minutes.',
      'Add milk and sugar, bringing the mixture to a rolling boil multiple times to aerate.',
      'Strain into cups and serve piping hot.'
    ],
    flavor_highlights: ['Warming Ginger Heat', 'Sweet Milky Richness', 'Aromatic Cardamom']
  }
];
