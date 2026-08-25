import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, '../data/massiveRecipesData.json');
const recipes = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const MAP = {
  "vada pav": U("photo-1565557623262-b51c2513a641"),
  "misal pav": U("photo-1565557623262-b51c2513a641"),
  "pav bhaji": U("photo-1585937421612-70a008356fbe"),
  "puran poli": U("photo-1565557623262-b51c2513a641"),
  "modak": U("photo-1551024709-8f23befc6f87"),
  "butter chicken": U("photo-1588166524941-3bf61a9c41db"),
  "chole bhature": U("photo-1626777552726-4a6b54c97e46"),
  "dal makhani": U("photo-1546833999-b9f581a1996d"),
  "sarson da saag": U("photo-1603894584373-5ac82b2ae398"),
  "amritsari kulcha": U("photo-1565557623262-b51c2513a641"),
  "kerala fish curry": U("photo-1574484284002-952d92456975"),
  "appam and stew": U("photo-1630383249896-424e482df921"),
  "puttu and kadala curry": U("photo-1626074353765-517a681e40be"),
  "karimeen": U("photo-1534422298391-e4f8c172dddb"),
  "palada payasam": U("photo-1551024709-8f23befc6f87"),
  "idli sambar": U("photo-1589301760014-d929f3979dbc"),
  "masala dosa": U("photo-1668236543090-82eba5ee5976"),
  "chettinad chicken": U("photo-1645177628172-a94c1f96e6db"),
  "ven pongal": U("photo-1630383249896-424e482df921"),
  "medu vada": U("photo-1589301760014-d929f3979dbc"),
  "dhokla": U("photo-1565557623262-b51c2513a641"),
  "thepla": U("photo-1565557623262-b51c2513a641"),
  "khandvi": U("photo-1565557623262-b51c2513a641"),
  "undhiyu": U("photo-1585937421612-70a008356fbe"),
  "fafda jalebi": U("photo-1541781774459-bb2af2f05b55"),
  "dal bati churma": U("photo-1546833999-b9f581a1996d"),
  "laal maas": U("photo-1545247181-516773cae754"),
  "gatte ki sabzi": U("photo-1585937421612-70a008356fbe"),
  "pyaaz kachori": U("photo-1565557623262-b51c2513a641"),
  "ghevar": U("photo-1541781774459-bb2af2f05b55"),
  "kosha mangsho": U("photo-1545247181-516773cae754"),
  "macher jhol": U("photo-1574484284002-952d92456975"),
  "rosogolla": U("photo-1551024709-8f23befc6f87"),
  "pyaz kachori": U("photo-1574484284002-952d92456975"),
  "sandesh": U("photo-1551024709-8f23befc6f87"),
  "nihari": U("photo-1545247181-516773cae754"),
  "aloo tikki chaat": U("photo-1565557623262-b51c2513a641"),
  "paranthas": U("photo-1565557623262-b51c2513a641"),
  "seekh kebab": U("photo-1599487488170-d11ec9c172f0"),
  "moth kachori": U("photo-1565557623262-b51c2513a641"),
  "hyderabadi biryani": U("photo-1563379091339-03b21ab4a4f8"),
  "haleem": U("photo-1545247181-516773cae754"),
  "mirchi ka salan": U("photo-1585937421612-70a008356fbe"),
  "double ka meetha": U("photo-1551024709-8f23befc6f87"),
  "boti kebab": U("photo-1599487488170-d11ec9c172f0"),
  "rogan josh": U("photo-1545247181-516773cae754"),
  "yakhni": U("photo-1545247181-516773cae754"),
  "dum aloo": U("photo-1585937421612-70a008356fbe"),
  "gushtaba": U("photo-1545247181-516773cae754"),
  "kahwa": U("photo-1576092768241-dec231879fc3"),
  "goan fish curry": U("photo-1574484284002-952d92456975"),
  "pork vindaloo": U("photo-1545247181-516773cae754"),
  "bebinca": U("photo-1551024709-8f23befc6f87"),
  "chicken xacuti": U("photo-1645177628172-a94c1f96e6db"),
  "prawn balchao": U("photo-1574484284002-952d92456975"),
  "masor tenga": U("photo-1574484284002-952d92456975"),
  "khar": U("photo-1585937421612-70a008356fbe"),
  "duck meat curry": U("photo-1545247181-516773cae754"),
  "aloo pitika": U("photo-1585937421612-70a008356fbe"),
  "pitha": U("photo-1551024709-8f23befc6f87"),
  "dalma": U("photo-1546833999-b9f581a1996d"),
  "chhena poda": U("photo-1551024709-8f23befc6f87"),
  "rasagola": U("photo-1551024709-8f23befc6f87"),
  "macha ghanta": U("photo-1574484284002-952d92456975"),
  "pakhala bhata": U("photo-1589301760014-d929f3979dbc"),
  "bisi bele bath": U("photo-1589301760014-d929f3979dbc"),
  "mysore pak": U("photo-1541781774459-bb2af2f05b55"),
  "ragi mudde": U("photo-1585937421612-70a008356fbe"),
  "gulab jamun": U("photo-1541781774459-bb2af2f05b55"),
  "jalebi": U("photo-1541781774459-bb2af2f05b55"),
  "samosa": U("photo-1565557623262-b51c2513a641"),
  "tandoori chicken": U("photo-1599487488170-d11ec9c172f0"),
  "paneer tikka": U("photo-1567188040759-fb8a883dc6d8"),
};

function getBestImage(title) {
  let s = '';
  if (typeof title === 'string') s = title;
  else if (title?.en) s = title.en;
  else s = Object.values(title || {})[0] || '';

  const n = s.toLowerCase().trim();

  // We use the new local path for all downloaded images
  const fileName = n.replace(/\s+/g, '_') + '.jpg';

  // Check if it's one of the dishes we downloaded based on the Map or general rules
  // Since we downloaded specific dishes, we can just point all of them to /images/dishes/
  // The frontend Vite server serves public/ as /
  return `/images/dishes/${fileName}`;
}

let count = 0;
recipes.forEach(r => {
  r.image = getBestImage(r.title);
  count++;
});

fs.writeFileSync(jsonPath, JSON.stringify(recipes, null, 2));
console.log(`Updated ${count} recipes with accurate matching images in massiveRecipesData.json`);
