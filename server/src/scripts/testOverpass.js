import fs from 'fs';

async function test() {
  const lat = 20.9042;
  const lng = 74.7749;
  const overpassQuery = `[out:json];nwr["amenity"~"restaurant|fast_food|cafe"](around:8000,${lat},${lng});out center;`;
  console.log('Query:', overpassQuery);
  const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`, {
    headers: { 'User-Agent': 'FlavorMind-App/1.0' }
  });
  const text = await response.text();
  if (!text.startsWith('{')) {
    console.log('Error from Overpass:', text);
    return;
  }
  const data = JSON.parse(text);
  console.log(`Found ${data.elements?.length || 0} elements`);
  if (data.elements) {
    const valid = data.elements.filter(e => e.tags && e.tags.name);
    console.log(`Found ${valid.length} valid named elements`);
    console.log(valid.slice(0, 3));
  }
}

test();
