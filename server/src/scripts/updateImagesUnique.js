import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data/massiveRecipesData.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

function updateImages() {
  console.log(`Starting QA Agent (7) Wikipedia Image Engine re-map for ${data.length} dishes...`);
  let updatedCount = 0;
  
  for (let i = 0; i < data.length; i++) {
    const dish = data[i];
    const dishName = dish.title.en || dish.title;
    
    // Switch to the backend Wikipedia image engine!
    dish.image = `http://localhost:5000/api/v1/images/generate?dish=${encodeURIComponent(dishName)}`;
    updatedCount++;
    
    if (i % 50 === 0) {
      console.log(`[${i}/${data.length}] Assigned Wikipedia engine URL for: ${dishName}`);
    }
  }
  
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log(`\nFinished! 7th Agent successfully mapped ${updatedCount}/${data.length} dishes to Wikipedia Image Engine.`);
}

updateImages();
