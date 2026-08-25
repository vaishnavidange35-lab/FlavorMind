import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STATES = [
  "Maharashtra", "Punjab", "Kerala", "Tamil Nadu", "Gujarat", 
  "Rajasthan", "West Bengal", "Delhi", "Hyderabad", "Kashmir", 
  "Goa", "Assam", "Odisha", "Karnataka"
];

const CUISINES = {
  "Maharashtra": "Maharashtrian", "Punjab": "Punjabi", "Kerala": "South Indian", 
  "Tamil Nadu": "South Indian", "Gujarat": "Gujarati", "Rajasthan": "North Indian", 
  "West Bengal": "Bengali", "Delhi": "North Indian", "Hyderabad": "South Indian", 
  "Kashmir": "North Indian", "Goa": "Goan", "Assam": "Assamese", 
  "Odisha": "Odia", "Karnataka": "South Indian"
};

const ALL_TAGS = [
  "Healthy", "Spicy", "Sweet", "Street Food", "High Protein", "Low Calories", 
  "Quick Recipes", "Budget Friendly", "Festival Food", "Kids Special", 
  "Breakfast", "Lunch", "Dinner", "Late Night", "Comfort Food", "Traditional"
];

const INGREDIENTS_DB = [
  "Paneer", "Chicken", "Mutton", "Fish", "Prawns", "Potatoes", "Cauliflower", 
  "Lentils", "Chickpeas", "Spinach", "Tofu", "Mushroom", "Eggplant", "Okra"
];

const STYLES = [
  "Masala", "Curry", "Fry", "Roast", "Tikka", "Biryani", "Korma", "Vindaloo", 
  "Bhuna", "Saag", "Makhani", "Tadka", "65", "Chettinad", "Gassi", "Kholapuri"
];

const EQUIPMENT = [
  ["Heavy-bottomed pan", "Spatula"],
  ["Tawa", "Mixing bowl"],
  ["Blender", "Cooking pot", "Ladle"],
  ["Pressure cooker", "Frying pan"],
  ["Wok", "Skimmer"],
  ["Oven", "Baking tray"]
];

const ADJECTIVES = [
  "Spicy", "Authentic", "Smoky", "Creamy", "Tangy", "Fiery", "Homestyle", 
  "Classic", "Royal", "Rich", "Zesty", "Robust", "Traditional", "Signature"
];

const IMAGES = [
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1589302168068-964664d93cb0?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1610970881699-44a5587ce572?auto=format&fit=crop&w=600&q=80"
];

// Translations Maps
const DICT = {
  hi: {
    "Spicy": "मसालेदार", "Authentic": "प्रामाणिक", "Smoky": "स्मोकी", "Creamy": "मलाईदार", "Tangy": "तीखा", "Fiery": "तीव्र", "Homestyle": "घरेलू", "Classic": "क्लासिक", "Royal": "शाही", "Rich": "समृद्ध", "Zesty": "चटपटा", "Robust": "मज़बूत", "Traditional": "पारंपरिक", "Signature": "सिग्नेचर",
    "Paneer": "पनीर", "Chicken": "चिकन", "Mutton": "मटन", "Fish": "मछली", "Prawns": "झींगा", "Potatoes": "आलू", "Cauliflower": "गोभी", "Lentils": "दाल", "Chickpeas": "छोले", "Spinach": "पालक", "Tofu": "टोफू", "Mushroom": "मशरूम", "Eggplant": "बैंगन", "Okra": "भिंडी",
    "Masala": "मसाला", "Curry": "करी", "Fry": "फ्राई", "Roast": "रोस्ट", "Tikka": "टिक्का", "Biryani": "बिरयानी", "Korma": "कोरमा", "Vindaloo": "विंडालू", "Bhuna": "भुना", "Saag": "साग", "Makhani": "मखनी", "Tadka": "तड़का", "65": "65", "Chettinad": "चेट्टीनाड", "Gassi": "गस्सी", "Kholapuri": "कोल्हापुरी"
  },
  mr: {
    "Spicy": "मसालेदार", "Authentic": "अस्सल", "Smoky": "स्मोकी", "Creamy": "मलाईदार", "Tangy": "आंबट", "Fiery": "तीव्र", "Homestyle": "घरगुती", "Classic": "क्लासिक", "Royal": "शाही", "Rich": "समृद्ध", "Zesty": "चटपटीत", "Robust": "मजबूत", "Traditional": "पारंपारिक", "Signature": "सिग्नेचर",
    "Paneer": "पनीर", "Chicken": "चिकन", "Mutton": "मटण", "Fish": "मासे", "Prawns": "कोळंबी", "Potatoes": "बटाटे", "Cauliflower": "फ्लॉवर", "Lentils": "डाळ", "Chickpeas": "छोले", "Spinach": "पालक", "Tofu": "टोफू", "Mushroom": "मशरूम", "Eggplant": "वांगी", "Okra": "भेंडी",
    "Masala": "मसाला", "Curry": "करी", "Fry": "फ्राय", "Roast": "रोस्ट", "Tikka": "टिक्का", "Biryani": "बिर्याणी", "Korma": "कोरमा", "Vindaloo": "विंडालू", "Bhuna": "भुना", "Saag": "साग", "Makhani": "मखनी", "Tadka": "तडका", "65": "65", "Chettinad": "चेट्टीनाड", "Gassi": "गस्सी", "Kholapuri": "कोल्हापुरी"
  },
  te: {
    "Spicy": "కారంగా", "Authentic": "ప్రామాణికమైన", "Smoky": "స్మోకీ", "Creamy": "క్రీమీ", "Tangy": "పుల్లని", "Fiery": "తీవ్రమైన", "Homestyle": "ఇంట్లో", "Classic": "క్లాసిక్", "Royal": "రాయల్", "Rich": "రిచ్", "Zesty": "రుచికరమైన", "Robust": "బలమైన", "Traditional": "సాంప్రదాయ", "Signature": "సిగ్నేచర్",
    "Paneer": "పనీర్", "Chicken": "చికెన్", "Mutton": "మటన్", "Fish": "చేప", "Prawns": "రొయ్యలు", "Potatoes": "బంగాళదుంపలు", "Cauliflower": "కాలీఫ్లవర్", "Lentils": "పప్పు", "Chickpeas": "శెనగలు", "Spinach": "పాలకూర", "Tofu": "టోఫు", "Mushroom": "పుట్టగొడుగు", "Eggplant": "వంకాయ", "Okra": "బెండకాయ",
    "Masala": "మసాలా", "Curry": "కూర", "Fry": "ఫ్రై", "Roast": "రోస్ట్", "Tikka": "టిక్కా", "Biryani": "బిర్యానీ", "Korma": "కోర్మా", "Vindaloo": "విండాలూ", "Bhuna": "భునా", "Saag": "సాగ్", "Makhani": "మఖానీ", "Tadka": "తడ్కా", "65": "65", "Chettinad": "చెట్టినాడ్", "Gassi": "గస్సీ", "Kholapuri": "కొల్హాపూరి"
  }
};

const tField = (word, lang) => DICT[lang][word] || word;

const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function generateRecipe(index, state) {
  const adj = randomChoice(ADJECTIVES);
  const main = randomChoice(INGREDIENTS_DB);
  const style = randomChoice(STYLES);
  
  const title = {
    en: `${adj} ${state} ${main} ${style}`,
    hi: `${tField(adj, 'hi')} ${state} ${tField(main, 'hi')} ${tField(style, 'hi')}`,
    mr: `${tField(adj, 'mr')} ${state} ${tField(main, 'mr')} ${tField(style, 'mr')}`,
    te: `${tField(adj, 'te')} ${state} ${tField(main, 'te')} ${tField(style, 'te')}`
  };

  const isVeg = ["Paneer", "Potatoes", "Cauliflower", "Lentils", "Chickpeas", "Spinach", "Tofu", "Mushroom", "Eggplant", "Okra"].includes(main);
  
  const prepTime = randomInt(10, 45);
  const cookTime = randomInt(15, 90);
  
  const descEn = `A highly authentic ${state} delicacy featuring tender ${main.toLowerCase()} prepared in a classic ${style} manner. Known for its ${adj.toLowerCase()} flavor profile and deep cultural roots.`;
  
  const description = {
    en: descEn,
    hi: `एक अत्यधिक प्रामाणिक ${state} व्यंजन जिसमें निविदा ${tField(main, 'hi')} को क्लासिक ${tField(style, 'hi')} तरीके से तैयार किया गया है।`,
    mr: `एक अत्यंत अस्सल ${state} पदार्थ ज्यामध्ये कोवळे ${tField(main, 'mr')} क्लासिक ${tField(style, 'mr')} पद्धतीने तयार केले आहे.`,
    te: `క్లాసిక్ ${tField(style, 'te')} పద్ధతిలో తయారుచేసిన లేత ${tField(main, 'te')}ను కలిగి ఉన్న అత్యంత ప్రామాణికమైన ${state} వంటకం.`
  };
  
  const ingredientsBase = [
    { qty: `${randomInt(200, 500)}g`, item: main },
    { en: "2 large onions, finely chopped", hi: "2 बड़े प्याज, बारीक कटे हुए", mr: "2 मोठे कांदे, बारीक चिरून", te: "2 పెద్ద ఉల్లిపాయలు, సన్నగా తరిగినవి" },
    { en: "2 tomatoes, pureed", hi: "2 टमाटर, प्यूरी", mr: "2 टोमॅटो, प्युरी", te: "2 టమోటాలు, ప్యూరీ" },
    { en: "1 tbsp ginger-garlic paste", hi: "1 बड़ा चम्मच अदरक-लहसुन का पेस्ट", mr: "1 चमचा आले-लसूण पेस्ट", te: "1 టేబుల్ స్పూన్ అల్లం-వెల్లుల్లి పేస్ట్" },
    { en: "1 tsp turmeric powder", hi: "1 चम्मच हल्दी पाउडर", mr: "1 चमचा हळद पावडर", te: "1 టీస్పూన్ పసుపు పొడి" }
  ];

  const mappedIngredients = {
    en: ingredientsBase.map(i => i.item ? `${i.qty} ${i.item}` : i.en),
    hi: ingredientsBase.map(i => i.item ? `${i.qty} ${tField(i.item, 'hi')}` : i.hi),
    mr: ingredientsBase.map(i => i.item ? `${i.qty} ${tField(i.item, 'mr')}` : i.mr),
    te: ingredientsBase.map(i => i.item ? `${i.qty} ${tField(i.item, 'te')}` : i.te)
  };

  const ingredientDetails = ingredientsBase.map((i, idx) => {
    return {
      name: i.item || (i.en.includes("onion") ? "Onion" : i.en.includes("tomato") ? "Tomato" : i.en.includes("ginger") ? "Ginger Garlic Paste" : i.en.includes("turmeric") ? "Turmeric" : "Spice"),
      quantity: i.qty || (i.en.includes("onion") ? "2 large" : i.en.includes("tomato") ? "2" : i.en.includes("ginger") ? "1 tbsp" : "1 tsp"),
      image: `https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80&sig=${randomInt(1, 1000)}`
    }
  });

  const instructions = {
    en: [
      `Prepare the ${main.toLowerCase()} by washing and cutting it into bite-sized pieces.`,
      `In a heavy-bottomed pan, heat 2 tablespoons of oil or ghee over medium heat.`,
      `Add finely chopped onions and sauté until golden brown.`,
      `Add tomato puree along with ${state}-specific spice blends.`,
      `Gently fold in the ${main.toLowerCase()} ensuring it is well coated with the masala.`
    ],
    hi: [
      `${tField(main, 'hi')} को धोकर और छोटे टुकड़ों में काटकर तैयार करें।`,
      `एक भारी तले वाले पैन में, मध्यम आँच पर 2 बड़े चम्मच तेल या घी गरम करें।`,
      `बारीक कटे हुए प्याज डालें और सुनहरा भूरा होने तक भूनें।`,
      `${state}-विशिष्ट मसाला मिश्रण के साथ टमाटर प्यूरी डालें।`,
      `${tField(main, 'hi')} को धीरे से मिलाएँ ताकि यह मसाले के साथ अच्छी तरह से लेपित हो जाए।`
    ],
    mr: [
      `${tField(main, 'mr')} धुवून आणि लहान तुकडे करून तयार करा.`,
      `एका जड तळाच्या पॅनमध्ये मध्यम आचेवर 2 चमचे तेल किंवा तूप गरम करा.`,
      `बारीक चिरलेला कांदा घाला आणि सोनेरी तपकिरी होईपर्यंत परता.`,
      `${state}-विशिष्ट मसाला मिश्रणासह टोमॅटो प्युरी घाला.`,
      `${tField(main, 'mr')} हलक्या हाताने मिसळा जेणेकरून ते मसाल्यात चांगले मिसळेल.`
    ],
    te: [
      `${tField(main, 'te')} కడిగి చిన్న ముక్కలుగా కత్తిరించడం ద్వారా సిద్ధం చేయండి.`,
      `మందపాటి అడుగున ఉన్న పాన్‌లో, మీడియం మంట మీద 2 టేబుల్ స్పూన్ల నూనె లేదా నెయ్యి వేడి చేయండి.`,
      `సన్నగా తరిగిన ఉల్లిపాయలను వేసి బంగారు గోధుమ రంగు వచ్చే వరకు వేయించండి.`,
      `${state}-నిర్దిష్ట మసాలా మిశ్రమాలతో పాటు టమోటా ప్యూరీని జోడించండి.`,
      `${tField(main, 'te')}ని నెమ్మదిగా మడతపెట్టండి, అది మసాలాతో బాగా పూత పూయబడిందని నిర్ధారించుకోండి.`
    ]
  };
  
  const baseTags = [isVeg ? "Veg" : "Non Veg", CUISINES[state], state];
  if (adj === "Spicy" || adj === "Fiery") baseTags.push("Spicy");
  if (style === "Sweet" || main === "Sweet") baseTags.push("Sweet");
  
  const additionalTags = [];
  while(additionalTags.length < randomInt(2, 5)) {
    const t = randomChoice(ALL_TAGS);
    if(!baseTags.includes(t) && !additionalTags.includes(t)) additionalTags.push(t);
  }
  const tags = [...baseTags, ...additionalTags];
  
  const calories = randomInt(250, 800);
  const protein = isVeg ? randomInt(5, 25) : randomInt(20, 60);

  const recipe = {
    id: `rec-dyn-${index}`,
    title: title,
    state: state,
    cuisine: CUISINES[state],
    tags: tags,
    calories: calories,
    protein: protein,
    image: randomChoice(IMAGES),
    prep_time: prepTime,
    cook_time: cookTime,
    total_time: prepTime + cookTime,
    difficulty: randomChoice(["Easy", "Intermediate", "Advanced"]),
    servings: randomInt(2, 6),
    rating: Number((Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)),
    reviews: randomInt(10, 500),
    isVeg: isVeg,
    diet: isVeg ? "Vegetarian" : "Non-Vegetarian",
    category: style,
    authenticityScore: randomInt(85, 99),
    description: description,
    ingredients: mappedIngredients,
    ingredientDetails: ingredientDetails,
    equipment: randomChoice(EQUIPMENT),
    instructions: instructions,
    radarData: [
      { subject: "Spicy", A: randomInt(40, 95) },
      { subject: "Richness", A: randomInt(50, 95) },
      { subject: "Smoky", A: randomInt(20, 80) },
      { subject: "Salty", A: randomInt(60, 85) },
      { subject: "Sweet", A: randomInt(10, 60) },
      { subject: "Sour", A: randomInt(30, 85) }
    ],
    metrics: {
      searches: randomInt(1000, 50000),
      orders: randomInt(100, 10000),
      loved: randomInt(500, 20000)
    }
  };
  
  return recipe;
}

function generateDataset() {
  const recipes = [];
  let counter = 1;
  
  console.log("Starting generation of 400+ recipes...");
  
  for (const state of STATES) {
    for (let i = 0; i < 30; i++) {
      recipes.push(generateRecipe(counter++, state));
    }
  }
  
  const outputPath = path.join(__dirname, '../data/massiveRecipesData.json');
  fs.writeFileSync(outputPath, JSON.stringify(recipes, null, 2));
  console.log(`Successfully generated ${recipes.length} recipes and saved to ${outputPath}`);
}

generateDataset();
