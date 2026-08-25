const query = '[out:json];area[name="Mumbai"]->.searchArea;node["amenity"="restaurant"](area.searchArea);out 10;';
fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`, {
  method: 'GET',
  headers: {
    'User-Agent': 'FlavorMind-App/1.0'
  }
}).then(async r => {
  console.log(r.status);
  console.log((await r.text()).substring(0, 500));
}).catch(console.error);
