import fs from 'fs';
import path from 'path';
import { Jimp } from 'jimp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGE_PATHS = [
  path.join(__dirname, '../../test_image.jpg')
];

const OUT_DIR = path.join(__dirname, '../../public/images');

const GRID_NAMES = [
  // Row 1
  "vada pav", "misal pav", "pav bhaji", "modak", "butter chicken", "dal makhani", "ghevar", "kosha mangsho", "bengali fish", "rosogolla", "rosogolla 2", "shorshe ilish",
  // Row 2
  "puran poli", "amritsari kulcha", "dhokla", "thepla", "khandvi", "undhiyu", "fafda jalebi", "macher jhol", "seekh kebab", "nihari", "sandesh", "goan fish curry",
  // Row 3
  "row3_1", "row3_2", "row3_3", "puttu and kadala curry", "masala dosa", "aloo tikki chaat", "moth kachori", "mirchi ka salan", "double ka meetha", "pork vindaloo", "row3_11", "row3_12",
  // Row 4
  "amritsari kulcha 2", "dal makhani 2", "appam and stew", "puttu and kadala curry 2", "karimeen pollichathu", "palada payasam", "swoen balcino", "masor tenga", "khar", "aloo pitika", "row4_11", "row4_12",
  // Row 5
  "pav bhaji 2", "chole bhature", "pork vindaloo 2", "chicken xacuti", "prawn balchao", "dalma", "oalia", "chhena poda", "rasagola", "macha ghanta", "pakhala bhata", "bisi bele bath",
  // Row 6
  "vada pav 3", "misal pav 3", "idli sambar", "dhokla 3", "mysore pak", "ragi mudde", "gulab jamun", "jalebi", "samosa", "tandoori chicken", "paneer tikka", "row6_12"
];

async function extract() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  let imgPath = IMAGE_PATHS.find(p => fs.existsSync(p));
  if (!imgPath) {
    console.error("Collage image not found!");
    return;
  }

  console.log(`Loading image from ${imgPath}...`);
  const image = await Jimp.read(imgPath);
  
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  const cols = 12;
  const rows = 6;
  const cellW = Math.floor(width / cols);
  const cellH = Math.floor(height / rows);
  
  console.log(`Image size: ${width}x${height}. Cell size: ${cellW}x${cellH}`);
  
  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      let name = GRID_NAMES[idx];
      
      if (!name || name.startsWith('row')) continue;
      
      // Clean up names like "vada pav 2" -> "vada pav"
      const cleanName = name.replace(/\s+\d+$/, '');
      const fileName = cleanName.replace(/\s+/g, '_') + '.jpg';
      const outPath = path.join(OUT_DIR, fileName);
      
      const clone = image.clone();
      clone.crop(c * cellW, r * cellH, cellW, cellH);
      await clone.writeAsync(outPath);
      count++;
    }
  }
  
  console.log(`Successfully extracted ${count} images to ${OUT_DIR}`);
}

extract().catch(console.error);
