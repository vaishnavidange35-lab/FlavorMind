import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const dataPath = path.join(__dirname, '../data/massiveRecipesData.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY || '';

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchImageForDish(dishName) {
  const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(dishName + ' food')}&image_type=photo&category=food&per_page=3`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (result.hits && result.hits.length > 0) {
      return result.hits[0].webformatURL || result.hits[0].largeImageURL;
    }
  } catch (error) {
    console.error(`Failed to fetch image for ${dishName}:`, error.message);
  }
  return null;
}

async function updateImages() {
  console.log(`Starting to update images for ${data.length} dishes...`);
  let updatedCount = 0;
  
  for (let i = 0; i < data.length; i++) {
    const dish = data[i];
    const dishName = dish.title.en || dish.title;
    
    console.log(`[${i + 1}/${data.length}] Fetching image for: ${dishName}`);
    const imageUrl = await fetchImageForDish(dishName);
    
    if (imageUrl) {
      dish.image = imageUrl;
      updatedCount++;
    }
    
    // Rate limit to avoid 429
    await delay(300);
  }
  
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log(`\nFinished! Updated images for ${updatedCount}/${data.length} dishes.`);
}

updateImages();
