import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.join(__dirname, '../../../client/public/images/dishes');

const DISHES = [
  "vada pav", "misal pav", "pav bhaji", "modak", "butter chicken", "dal makhani", "ghevar", "kosha mangsho", "bengali fish", "rosogolla", "shorshe ilish",
  "puran poli", "amritsari kulcha", "dhokla", "thepla", "khandvi", "undhiyu", "fafda jalebi", "macher jhol", "seekh kebab", "nihari", "sandesh", "goan fish curry",
  "puttu and kadala curry", "masala dosa", "aloo tikki chaat", "moth kachori", "mirchi ka salan", "double ka meetha", "pork vindaloo",
  "appam and stew", "karimeen pollichathu", "palada payasam", "masor tenga", "khar", "aloo pitika",
  "chole bhature", "chicken xacuti", "prawn balchao", "dalma", "chhena poda", "rasagola", "macha ghanta", "pakhala bhata", "bisi bele bath",
  "idli sambar", "mysore pak", "ragi mudde", "gulab jamun", "jalebi", "samosa", "tandoori chicken", "paneer tikka"
];

// Fallback high quality Unsplash images map
const MAP = {
  "vada pav":               "photo-1565557623262-b51c2513a641",
  "misal pav":              "photo-1565557623262-b51c2513a641",
  "pav bhaji":              "photo-1585937421612-70a008356fbe",
  "puran poli":             "photo-1565557623262-b51c2513a641",
  "modak":                  "photo-1551024709-8f23befc6f87",
  "butter chicken":         "photo-1588166524941-3bf61a9c41db",
  "chole bhature":          "photo-1626777552726-4a6b54c97e46",
  "dal makhani":            "photo-1546833999-b9f581a1996d",
  "amritsari kulcha":       "photo-1565557623262-b51c2513a641",
  "appam and stew":         "photo-1630383249896-424e482df921",
  "puttu and kadala curry": "photo-1626074353765-517a681e40be",
  "karimeen pollichathu":   "photo-1534422298391-e4f8c172dddb",
  "palada payasam":         "photo-1551024709-8f23befc6f87",
  "idli sambar":            "photo-1589301760014-d929f3979dbc",
  "masala dosa":            "photo-1668236543090-82eba5ee5976",
  "dhokla":                 "photo-1565557623262-b51c2513a641",
  "thepla":                 "photo-1565557623262-b51c2513a641",
  "khandvi":                "photo-1565557623262-b51c2513a641",
  "undhiyu":                "photo-1585937421612-70a008356fbe",
  "fafda jalebi":           "photo-1541781774459-bb2af2f05b55",
  "ghevar":                 "photo-1541781774459-bb2af2f05b55",
  "kosha mangsho":          "photo-1545247181-516773cae754",
  "macher jhol":            "photo-1574484284002-952d92456975",
  "rosogolla":              "photo-1551024709-8f23befc6f87",
  "shorshe ilish":          "photo-1574484284002-952d92456975",
  "sandesh":                "photo-1551024709-8f23befc6f87",
  "nihari":                 "photo-1545247181-516773cae754",
  "aloo tikki chaat":       "photo-1565557623262-b51c2513a641",
  "seekh kebab":            "photo-1599487488170-d11ec9c172f0",
  "moth kachori":           "photo-1565557623262-b51c2513a641",
  "mirchi ka salan":        "photo-1585937421612-70a008356fbe",
  "double ka meetha":       "photo-1551024709-8f23befc6f87",
  "pork vindaloo":          "photo-1545247181-516773cae754",
  "goan fish curry":        "photo-1574484284002-952d92456975",
  "chicken xacuti":         "photo-1645177628172-a94c1f96e6db",
  "prawn balchao":          "photo-1574484284002-952d92456975",
  "masor tenga":            "photo-1574484284002-952d92456975",
  "khar":                   "photo-1585937421612-70a008356fbe",
  "aloo pitika":            "photo-1585937421612-70a008356fbe",
  "dalma":                  "photo-1546833999-b9f581a1996d",
  "chhena poda":            "photo-1551024709-8f23befc6f87",
  "rasagola":               "photo-1551024709-8f23befc6f87",
  "macha ghanta":           "photo-1574484284002-952d92456975",
  "pakhala bhata":          "photo-1589301760014-d929f3979dbc",
  "bisi bele bath":         "photo-1589301760014-d929f3979dbc",
  "mysore pak":             "photo-1541781774459-bb2af2f05b55",
  "ragi mudde":             "photo-1585937421612-70a008356fbe",
  "gulab jamun":            "photo-1541781774459-bb2af2f05b55",
  "jalebi":                 "photo-1541781774459-bb2af2f05b55",
  "samosa":                 "photo-1565557623262-b51c2513a641",
  "tandoori chicken":       "photo-1599487488170-d11ec9c172f0",
  "paneer tikka":           "photo-1567188040759-fb8a883dc6d8"
};

const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function run() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  for (const dish of DISHES) {
    const fileName = dish.replace(/\s+/g, '_') + '.jpg';
    const filePath = path.join(OUT_DIR, fileName);
    
    if (fs.existsSync(filePath)) continue;

    const id = MAP[dish] || "photo-1585937421612-70a008356fbe";
    const url = U(id);
    console.log(`Downloading ${dish}...`);
    try {
      await downloadImage(url, filePath);
    } catch (e) {
      console.error(`Failed to download ${dish}:`, e.message);
    }
  }
  console.log("Done downloading images!");
}

run();
