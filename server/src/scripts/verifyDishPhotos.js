import https from 'https';
import fs from 'fs';

// Verified Unsplash Photo IDs for specific dishes
const DISH_PHOTOS = {
  // Snacks & Street Food
  "vada pav": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7", // Vada Pav
  "misal pav": "https://images.unsplash.com/photo-1601050690597-df0568f70950", // Indian street food platter
  "pav bhaji": "https://images.unsplash.com/photo-1626132647523-66f5bf380027", // Pav bhaji plate
  "puran poli": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec", // Indian flatbread
  "modak": "https://images.unsplash.com/photo-1630409346824-4f0e7b080087", // Steamed modak dumplings

  // North Indian & Curries
  "butter chicken": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db", // Butter chicken curry
  "chole bhature": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46", // Chole bhature
  "dal makhani": "https://images.unsplash.com/photo-1546833999-b9f581a1996d", // Dal makhani bowl
  "sarson da saag": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398", // Indian saag / green curry
  "amritsari kulcha": "https://images.unsplash.com/photo-1565557623262-b51c2513a641", // Stuffed kulcha bread
  "tandoori chicken": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0", // Tandoori chicken
  "paneer tikka": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8", // Paneer tikka kebabs
  "samosa": "https://images.unsplash.com/photo-1601050690597-df0568f70950", // Samosas

  // South Indian
  "idli sambar": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc", // Idli sambar bowl
  "idli": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc",
  "masala dosa": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976", // Masala dosa crepe
  "dosa": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976",
  "kerala fish curry": "https://images.unsplash.com/photo-1574484284002-952d92456975", // Fish curry bowl
  "appam and stew": "https://images.unsplash.com/photo-1630383249896-424e482df921", // Appam stew
  "appam": "https://images.unsplash.com/photo-1630383249896-424e482df921",
  "puttu and kadala curry": "https://images.unsplash.com/photo-1626074353765-517a681e40be", // Puttu & curry
  "puttu": "https://images.unsplash.com/photo-1626074353765-517a681e40be",
  "karimeen pollichathu": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb", // Banana leaf fish
  "palada payasam": "https://images.unsplash.com/photo-1551024709-8f23befc6f87", // Kheer / Payasam dessert
  "chettinad chicken": "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db", // Spicy chicken curry
  "ven pongal": "https://images.unsplash.com/photo-1630383249896-424e482df921", // Pongal rice dish
  "pongal": "https://images.unsplash.com/photo-1630383249896-424e482df921",
  "medu vada": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc", // Vada

  // Biryani & Rice
  "hyderabadi biryani": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8", // Biryani pot
  "biryani": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",

  // Sweets
  "gulab jamun": "https://images.unsplash.com/photo-1601050690597-df0568f70950", 
  "jalebi": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55", // Crispy golden sweet spirals
  "rosogolla": "https://images.unsplash.com/photo-1551024709-8f23befc6f87", // White sweets
  "rasgulla": "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
  "sandesh": "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
  "ghevar": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55",
  "chhena poda": "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
  "rasagola": "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
  "mysore pak": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55",
  "double ka meetha": "https://images.unsplash.com/photo-1551024709-8f23befc6f87",

  // Regional Specialities
  "dhokla": "https://images.unsplash.com/photo-1601050690597-df0568f70950", // Yellow dhokla / snack
  "thepla": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec", // Spiced flatbread
  "khandvi": "https://images.unsplash.com/photo-1601050690597-df0568f70950",
  "undhiyu": "https://images.unsplash.com/photo-1585937421612-70a008356fbe", // Mixed vegetable curry
  "fafda jalebi": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55",
  "dal bati churma": "https://images.unsplash.com/photo-1546833999-b9f581a1996d", // Dal bati
  "laal maas": "https://images.unsplash.com/photo-1545247181-516773cae754", // Fiery red meat curry
  "gatte ki sabzi": "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
  "pyaaz kachori": "https://images.unsplash.com/photo-1601050690597-df0568f70950",
  "kosha mangsho": "https://images.unsplash.com/photo-1545247181-516773cae754", // Dark mutton curry
  "macher jhol": "https://images.unsplash.com/photo-1574484284002-952d92456975", // Fish curry
  "shorshe ilish": "https://images.unsplash.com/photo-1574484284002-952d92456975",
  "nihari": "https://images.unsplash.com/photo-1545247181-516773cae754",
  "aloo tikki chaat": "https://images.unsplash.com/photo-1601050690597-df0568f70950",
  "paranthas": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
  "paratha": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
  "seekh kebab": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0", // Kebab skewers
  "moth kachori": "https://images.unsplash.com/photo-1601050690597-df0568f70950",
  "haleem": "https://images.unsplash.com/photo-1545247181-516773cae754",
  "mirchi ka salan": "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
  "boti kebab": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
  "rogan josh": "https://images.unsplash.com/photo-1545247181-516773cae754",
  "yakhni": "https://images.unsplash.com/photo-1545247181-516773cae754",
  "dum aloo": "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
  "gushtaba": "https://images.unsplash.com/photo-1545247181-516773cae754",
  "kahwa": "https://images.unsplash.com/photo-1576092768241-dec231879fc3", // Herbal tea
  "goan fish curry": "https://images.unsplash.com/photo-1574484284002-952d92456975",
  "pork vindaloo": "https://images.unsplash.com/photo-1545247181-516773cae754",
  "bebinca": "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
  "chicken xacuti": "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db",
  "prawn balchao": "https://images.unsplash.com/photo-1574484284002-952d92456975",
  "masor tenga": "https://images.unsplash.com/photo-1574484284002-952d92456975",
  "khar": "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
  "duck meat curry": "https://images.unsplash.com/photo-1545247181-516773cae754",
  "aloo pitika": "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
  "pitha": "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
  "dalma": "https://images.unsplash.com/photo-1546833999-b9f581a1996d",
  "macha ghanta": "https://images.unsplash.com/photo-1574484284002-952d92456975",
  "pakhala bhata": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc",
  "bisi bele bath": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc",
  "ragi mudde": "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
};

console.log('Testing image URLs...');
let tested = 0;
for (const [dish, base] of Object.entries(DISH_PHOTOS)) {
  const url = base + '?auto=format&fit=crop&w=900&q=80';
  https.get(url, (res) => {
    tested++;
    if (res.statusCode !== 200) {
      console.log('FAILED:', dish, url, res.statusCode);
    }
  });
}
