// Verify which Unsplash photo IDs actually resolve to 200 OK
import https from 'https';

const ALL_IDS = [
  "photo-1631452180519-c014fe946bc7",
  "photo-1601050690597-df0568f70950",
  "photo-1626132647523-66f5bf380027",
  "photo-1626082927389-6cd097cdc6ec",
  "photo-1630409346824-4f0e7b080087",
  "photo-1588166524941-3bf61a9c41db",
  "photo-1626777552726-4a6b54c97e46",
  "photo-1546833999-b9f581a1996d",
  "photo-1603894584373-5ac82b2ae398",
  "photo-1565557623262-b51c2513a641",
  "photo-1599487488170-d11ec9c172f0",
  "photo-1567188040759-fb8a883dc6d8",
  "photo-1574484284002-952d92456975",
  "photo-1630383249896-424e482df921",
  "photo-1626074353765-517a681e40be",
  "photo-1534422298391-e4f8c172dddb",
  "photo-1551024709-8f23befc6f87",
  "photo-1589301760014-d929f3979dbc",
  "photo-1668236543090-82eba5ee5976",
  "photo-1645177628172-a94c1f96e6db",
  "photo-1606491956689-2ea866880c84",
  "photo-1563379091339-03b21ab4a4f8",
  "photo-1541781774459-bb2af2f05b55",
  "photo-1545247181-516773cae754",
  "photo-1585937421612-70a008356fbe",
  "photo-1576092768241-dec231879fc3",
  "photo-1542367592-8849eb950fd8",
  "photo-1578985545062-69928b1d9587",
  "photo-1555939594-58d7cb561ad1",
  "photo-1604908176997-125f25cc6f3d",
  "photo-1596797038530-2c107229654b",
  "photo-1503264116251-35a269479413",
  "photo-1528735605505-33f6f6c59d88",
  "photo-1514512023070-6b03be5e0c4e",
  "photo-1580910057115-6c4fbe5a12e7",
  "photo-1543353071-873f17a7a088",
  "photo-1541832676-9b763b0239ab",
  "photo-1563245372-f21724e3856d",
  "photo-1512621776951-a57141f2eefd",
  "photo-1618160702438-9b02ab6515c9",
  "photo-1529543544282-ea669407fca3",
  "photo-1517244683847-7456b63c5969",
  "photo-1548943487-a2e4e43b4853",
  "photo-1642821373181-696a54913e93",
  "photo-1589302168068-964664d93cb0",
  "photo-1628294895950-9805252327bc",
  "photo-1631452180519-c014fe946bc0",
];

async function check(id) {
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=100&q=10`;
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 8000 }, (res) => {
      res.resume();
      resolve({ id, status: res.statusCode });
    });
    req.on('error', () => resolve({ id, status: 'ERROR' }));
    req.on('timeout', () => { req.destroy(); resolve({ id, status: 'TIMEOUT' }); });
  });
}

(async () => {
  const results = [];
  // Check 5 at a time
  for (let i = 0; i < ALL_IDS.length; i += 5) {
    const batch = ALL_IDS.slice(i, i + 5);
    const batchResults = await Promise.all(batch.map(check));
    results.push(...batchResults);
  }
  
  const ok = results.filter(r => r.status === 200);
  const broken = results.filter(r => r.status !== 200);
  
  console.log(`\n=== RESULTS ===`);
  console.log(`OK (200): ${ok.length}`);
  console.log(`BROKEN: ${broken.length}`);
  if (broken.length > 0) {
    console.log(`\nBroken IDs:`);
    broken.forEach(r => console.log(`  ${r.id} => ${r.status}`));
  }
  console.log(`\nWorking IDs:`);
  ok.forEach(r => console.log(`  ${r.id}`));
})();
