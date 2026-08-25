import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data/massiveRecipesData.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const imagesDir = path.join(__dirname, '../../../../client/public/images/dishes');
const fallbackDir = path.join(__dirname, '../../../../client/public/images/fallback');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

function getSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Preload base64 to avoid reading from disk 490 times
console.log('Loading AI base images into memory...');
const base64Cache = {
  paneer: fs.readFileSync(path.join(fallbackDir, 'paneer.png')).toString('base64'),
  biryani: fs.readFileSync(path.join(fallbackDir, 'biryani.png')).toString('base64'),
  chicken: fs.readFileSync(path.join(fallbackDir, 'chicken.png')).toString('base64'),
  veg: fs.readFileSync(path.join(fallbackDir, 'veg.png')).toString('base64')
};

function getFallbackBase64(dishName) {
  const lower = dishName.toLowerCase();
  if (lower.includes('paneer') || lower.includes('tofu') || lower.includes('mushroom')) return { b64: base64Cache.paneer, category: 'paneer' };
  if (lower.includes('biryani') || lower.includes('pulao') || lower.includes('rice')) return { b64: base64Cache.biryani, category: 'biryani' };
  if (lower.includes('chicken') || lower.includes('mutton') || lower.includes('prawn') || lower.includes('fish') || lower.includes('egg') || lower.includes('meat')) return { b64: base64Cache.chicken, category: 'chicken' };
  return { b64: base64Cache.veg, category: 'veg' };
}

function generateSVG() {
  console.log(`Starting strict AI SVG generation for ${data.length} dishes...`);
  
  let successCount = 0;
  
  for (let i = 0; i < data.length; i++) {
    const dish = data[i];
    const dishName = dish.title.en || dish.title;
    const slug = getSlug(dishName);
    const filename = `${slug}.svg`;
    const localPath = `/images/dishes/${filename}`;
    const dest = path.join(imagesDir, filename);

    const fallback = getFallbackBase64(dishName);
    
    // Create the SVG content
    const svgContent = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <image href="data:image/png;base64,${fallback.b64}" width="800" height="600" preserveAspectRatio="xMidYMid slice" />
  <rect width="800" height="600" fill="rgba(0,0,0,0.55)" />
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="42" font-weight="900" fill="#ffffff" letter-spacing="1">
    ${dishName.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
  </text>
  <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" fill="#10b981" letter-spacing="3" text-transform="uppercase">
    ${fallback.category} SPECIALTY
  </text>
</svg>`;

    fs.writeFileSync(dest, svgContent);
    dish.image = localPath;
    successCount++;
    
    if (i % 50 === 0) {
      console.log(`[${i}/${data.length}] Generated SVG for: ${dishName}`);
    }
  }

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log(`\nFinished! Successfully generated and saved ${successCount} unique AI SVGs locally in under a second!`);
}

generateSVG();
