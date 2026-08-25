import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data/massiveRecipesData.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const imagesDir = path.join(__dirname, '../../../../client/public/images/dishes');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

function getSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        file.close();
        fs.unlink(dest, () => reject(new Error(`Status: ${response.statusCode}`)));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => reject(err));
    });
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log(`Starting STRICT AI generation & download for ${data.length} dishes...`);
  console.log(`This will take approximately ${Math.ceil(data.length * 2 / 60)} minutes to complete to avoid rate limits.`);
  
  let successCount = 0;
  
  for (let i = 0; i < data.length; i++) {
    const dish = data[i];
    const dishName = dish.title.en || dish.title;
    const slug = getSlug(dishName);
    const filename = `${slug}.jpg`;
    const localPath = `/images/dishes/${filename}`;
    const dest = path.join(imagesDir, filename);

    try {
      // Check if we already downloaded a valid image previously
      if (!fs.existsSync(dest) || fs.statSync(dest).size < 5000) {
        const prompt = `${dishName} authentic indian food photography masterpiece 8k high quality`;
        const seed = Math.floor(Math.random() * 1000000);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true&seed=${seed}`;
        
        await downloadImage(imageUrl, dest);
        
        // Wait 2000ms (2 seconds) between downloads to absolutely prevent 429 errors
        await delay(2000);
      }
      
      dish.image = localPath;
      successCount++;
      
      if (i % 10 === 0 || i === data.length - 1) {
          console.log(`[${i + 1}/${data.length}] Processed: ${dishName}`);
      }
      
    } catch (err) {
      console.error(`Failed to generate ${dishName}: ${err.message}`);
      // If it STILL fails (e.g., 429), apply the fallback locally, but wait a bit longer to recover
      const lower = dishName.toLowerCase();
      if (lower.includes('paneer') || lower.includes('tofu') || lower.includes('mushroom')) dish.image = '/images/fallback/paneer.png';
      else if (lower.includes('biryani') || lower.includes('pulao') || lower.includes('rice')) dish.image = '/images/fallback/biryani.png';
      else if (lower.includes('chicken') || lower.includes('mutton') || lower.includes('prawn') || lower.includes('fish') || lower.includes('egg') || lower.includes('meat')) dish.image = '/images/fallback/chicken.png';
      else dish.image = '/images/fallback/veg.png';
      
      await delay(5000); // Wait 5 seconds if rate limited to allow server to cool off
    }
    
    // Save state every 10 images so we don't lose progress if killed
    if (i % 10 === 0) {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    }
  }

  // Final save
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log(`\nFinished! Successfully processed ${data.length} dishes. Perfect generations: ${successCount}.`);
}

main();
