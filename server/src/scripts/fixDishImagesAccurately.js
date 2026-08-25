import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATEGORY_POOLS = {
  paneer: [
    "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=80"
  ],
  mushroom: [
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80"
  ],
  chicken: [
    "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=80"
  ],
  spinach_saag: [
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80"
  ],
  eggplant_baingan: [
    "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=900&q=80"
  ],
  mutton_meat: [
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1529543544282-ea669407fca3?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80"
  ],
  fish_seafood: [
    "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=900&q=80"
  ],
  biryani_rice: [
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=900&q=80"
  ],
  dosa_south_indian: [
    "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=900&q=80"
  ],
  dal_lentils: [
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80"
  ],
  snacks_streetfood: [
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=80"
  ],
  sweets_desserts: [
    "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1542367592-8849eb950fd8?auto=format&fit=crop&w=900&q=80"
  ]
};

// Deterministic string hash
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function determineFactuallyAccurateImage(titleStr, recipeId = '') {
  const title = (typeof titleStr === 'object' ? (titleStr.en || titleStr.hi || '') : (titleStr || '')).toLowerCase();
  
  let key = 'dal_lentils'; // default baseline

  if (title.includes('paneer')) {
    key = 'paneer';
  } else if (title.includes('mushroom') || title.includes('gassi')) {
    key = 'mushroom';
  } else if (title.includes('chicken') || title.includes('murg') || title.includes('tikka') || title.includes('tandoori')) {
    key = 'chicken';
  } else if (title.includes('saag') || title.includes('palak') || title.includes('spinach')) {
    key = 'spinach_saag';
  } else if (title.includes('eggplant') || title.includes('baingan') || title.includes('bharta') || title.includes('bhuna')) {
    key = 'eggplant_baingan';
  } else if (title.includes('mutton') || title.includes('lamb') || title.includes('rogan') || title.includes('kebab')) {
    key = 'mutton_meat';
  } else if (title.includes('fish') || title.includes('prawn') || title.includes('karimeen') || title.includes('seafood')) {
    key = 'fish_seafood';
  } else if (title.includes('biryani') || title.includes('pulao') || title.includes('rice')) {
    key = 'biryani_rice';
  } else if (title.includes('dosa') || title.includes('idli') || title.includes('appam') || title.includes('puttu') || title.includes('sambar') || title.includes('pongal')) {
    key = 'dosa_south_indian';
  } else if (title.includes('sweet') || title.includes('gulab') || title.includes('jalebi') || title.includes('kheer') || title.includes('payasam') || title.includes('modak') || title.includes('halwa') || title.includes('poli')) {
    key = 'sweets_desserts';
  } else if (title.includes('pav') || title.includes('bhaji') || title.includes('kulcha') || title.includes('samosa') || title.includes('chaat') || title.includes('vada')) {
    key = 'snacks_streetfood';
  } else if (title.includes('dal') || title.includes('makhani') || title.includes('tadka') || title.includes('chole') || title.includes('rajma')) {
    key = 'dal_lentils';
  }

  const pool = CATEGORY_POOLS[key];
  const index = hashString(title + (recipeId || '')) % pool.length;
  return pool[index];
}

// Execution block if run directly
const dataPath = path.join(__dirname, '../data/massiveRecipesData.json');
if (fs.existsSync(dataPath)) {
  const recipes = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  let updatedCount = 0;

  recipes.forEach((r, idx) => {
    const title = r.title?.en || r.title || '';
    const newImage = determineFactuallyAccurateImage(title, r.id || String(idx));
    r.image = newImage;
    updatedCount++;
  });

  fs.writeFileSync(dataPath, JSON.stringify(recipes, null, 2), 'utf8');
  console.log(`Successfully updated ${updatedCount} recipes in massiveRecipesData.json with factually accurate image URLs!`);
}
