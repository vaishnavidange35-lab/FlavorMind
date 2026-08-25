import fs from 'fs';

async function test() {
  const query = "restaurant in Dhule";
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=50`;
  
  const response = await fetch(url, { headers: { 'User-Agent': 'FlavorMind-App/1.0' } });
  const data = await response.json();
  
  console.log(`Found ${data.length} results from Nominatim`);
  if (data.length > 0) {
    console.log(data.slice(0, 3));
  }
}

test();
