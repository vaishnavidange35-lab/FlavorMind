import https from 'https';

const POOLS = [
  "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1529543544282-ea669407fca3?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1542367592-8849eb950fd8?auto=format&fit=crop&w=900&q=80"
];

async function check(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 5000 }, (res) => {
      res.resume();
      resolve({ url, status: res.statusCode });
    });
    req.on('error', () => resolve({ url, status: 'ERROR' }));
    req.on('timeout', () => { req.destroy(); resolve({ url, status: 'TIMEOUT' }); });
  });
}

(async () => {
  const results = await Promise.all(POOLS.map(check));
  const broken = results.filter(r => r.status !== 200);
  console.log(`Total URLs checked: ${POOLS.length}, Broken: ${broken.length}`);
  if (broken.length > 0) {
    broken.forEach(b => console.log('Broken URL:', b.url, b.status));
  } else {
    console.log('ALL URLS ARE 100% WORKING (200 OK)!');
  }
})();
