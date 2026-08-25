import { config } from '../config/env.js';

const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const DISH_IMAGE_MAP = {
  "vada pav": U("photo-1631452180519-c014fe946bc7"),
  "misal pav": U("photo-1601050690597-df0568f70950"),
  "pav bhaji": U("photo-1626132647523-66f5bf380027"),
  "puran poli": U("photo-1626082927389-6cd097cdc6ec"),
  "modak": U("photo-1630409346824-4f0e7b080087"),
  "butter chicken": U("photo-1588166524941-3bf61a9c41db"),
  "chole bhature": U("photo-1626777552726-4a6b54c97e46"),
  "dal makhani": U("photo-1546833999-b9f581a1996d"),
  "sarson da saag": U("photo-1603894584373-5ac82b2ae398"),
  "amritsari kulcha": U("photo-1565557623262-b51c2513a641"),
  "tandoori chicken": U("photo-1599487488170-d11ec9c172f0"),
  "paneer tikka": U("photo-1567188040759-fb8a883dc6d8"),
  "samosa": U("photo-1601050690597-df0568f70950"),
  "kerala fish curry": U("photo-1574484284002-952d92456975"),
  "appam and stew": U("photo-1630383249896-424e482df921"),
  "appam": U("photo-1630383249896-424e482df921"),
  "puttu and kadala curry": U("photo-1626074353765-517a681e40be"),
  "puttu": U("photo-1626074353765-517a681e40be"),
  "karimeen pollichathu": U("photo-1534422298391-e4f8c172dddb"),
  "palada payasam": U("photo-1551024709-8f23befc6f87"),
  "idli sambar": U("photo-1589301760014-d929f3979dbc"),
  "idli": U("photo-1589301760014-d929f3979dbc"),
  "masala dosa": U("photo-1668236543090-82eba5ee5976"),
  "dosa": U("photo-1668236543090-82eba5ee5976"),
  "chettinad chicken": U("photo-1645177628172-a94c1f96e6db"),
  "ven pongal": U("photo-1630383249896-424e482df921"),
  "pongal": U("photo-1630383249896-424e482df921"),
  "medu vada": U("photo-1589301760014-d929f3979dbc"),
  "hyderabadi biryani": "/images/dishes/hyderabadi_biryani.jpg",
  "biryani": "/images/dishes/hyderabadi_biryani.jpg",
  "dhokla": U("photo-1601050690597-df0568f70950"),
  "thepla": U("photo-1626082927389-6cd097cdc6ec"),
  "dal bati churma": U("photo-1546833999-b9f581a1996d"),
  "dal bati": U("photo-1546833999-b9f581a1996d"),
  "gulab jamun": U("photo-1601050690597-df0568f70950"),
  "jalebi": U("photo-1541781774459-bb2af2f05b55"),
  "chhena poda": "/images/dishes/chhena_poda.jpg",
  "rosogolla": U("photo-1551024709-8f23befc6f87"),
  "rasgulla": U("photo-1551024709-8f23befc6f87"),
  "sandesh": U("photo-1551024709-8f23befc6f87"),
  "fiery rajasthan tofu masala": "/images/dishes/fiery_rajasthan_tofu_masala.jpg",
  "royal rajasthan spinach kholapuri": "/images/dishes/royal_rajasthan_spinach_kholapuri.jpg",
  "smoky rajasthan chicken gassi": "/images/dishes/smoky_rajasthan_chicken_gassi.jpg",
  "traditional rajasthan mushroom fry": "/images/dishes/traditional_rajasthan_mushroom_fry.jpg",
  "spicy rajasthan paneer 65": "/images/dishes/spicy_rajasthan_paneer_65.jpg",
  "signature rajasthan potatoes 65": "/images/dishes/signature_rajasthan_potatoes_65.jpg",
  "authentic rajasthan potatoes tadka": "/images/dishes/authentic_rajasthan_potatoes_tadka.jpg",
  "creamy rajasthan mushroom biryani": "/images/dishes/creamy_rajasthan_mushroom_biryani.jpg",
  "classic rajasthan spinach biryani": "/images/dishes/classic_rajasthan_spinach_biryani.jpg",
  "authentic rajasthan fish tadka": "/images/dishes/authentic_rajasthan_fish_tadka.jpg",
  "robust rajasthan prawns tikka": "/images/dishes/robust_rajasthan_prawns_tikka.jpg",
  "homestyle rajasthan tofu tadka": "/images/dishes/homestyle_rajasthan_tofu_tadka.jpg",
  "tangy rajasthan chicken tadka": "/images/dishes/tangy_rajasthan_chicken_tadka.jpg",
  "tangy rajasthan fish chettinad": "/images/dishes/tangy_rajasthan_fish_chettinad.jpg",
  "fiery rajasthan mutton fry": "/images/dishes/fiery_rajasthan_mutton_fry.jpg",
  "creamy west bengal chickpeas tadka": "/images/dishes/creamy_west_bengal_chickpeas_tadka.jpg",
  "traditional west bengal okra korma": "/images/dishes/traditional_west_bengal_okra_korma.jpg",
  "zesty west bengal paneer chettinad": "/images/dishes/zesty_west_bengal_paneer_chettinad.jpg",
  "smoky west bengal lentils tadka": "/images/dishes/smoky_west_bengal_lentils_tadka.jpg",
  "authentic west bengal chicken tadka": "/images/dishes/authentic_west_bengal_chicken_tadka.jpg",
  "aloo tikki chaat": "/images/dishes/aloo_tikki_chaat.jpg",
  "paranthas": "/images/dishes/paranthas.jpg",
  "moth kachori": "/images/dishes/moth_kachori.jpg",
  "fiery delhi chicken chettinad": "/images/dishes/fiery_delhi_chicken_chettinad.jpg",
  "signature delhi tofu tikka": "/images/dishes/signature_delhi_tofu_tikka.jpg",
  "fiery delhi potatoes saag": "/images/dishes/fiery_delhi_potatoes_saag.jpg",
  "homestyle delhi lentils korma": "/images/dishes/homestyle_delhi_lentils_korma.jpg",
  "zesty delhi chicken fry": "/images/dishes/zesty_delhi_chicken_fry.jpg",
  "creamy delhi lentils kholapuri": "/images/dishes/creamy_delhi_lentils_kholapuri.jpg",
  "haleem": "/images/dishes/haleem.jpg",
  "mirchi ka salan": "/images/dishes/mirchi_ka_salan.jpg",
  "double ka meetha": "/images/dishes/double_ka_meetha.jpg",
  "boti kebab": "/images/dishes/boti_kebab.jpg",
  "fiery hyderabad chickpeas tadka": "/images/dishes/fiery_hyderabad_chickpeas_tadka.jpg",
  "robust hyderabad mushroom korma": "/images/dishes/robust_hyderabad_mushroom_korma.jpg",
  "tangy hyderabad mushroom 65": "/images/dishes/tangy_hyderabad_mushroom_65.jpg",
  "fiery hyderabad potatoes curry": "/images/dishes/fiery_hyderabad_potatoes_curry.jpg",
  "classic hyderabad mutton biryani": "/images/dishes/classic_hyderabad_mutton_biryani.jpg",
  "traditional hyderabad chicken roast": "/images/dishes/traditional_hyderabad_chicken_roast.jpg",
  "classic hyderabad lentils curry": "/images/dishes/classic_hyderabad_lentils_curry.jpg",
  "smoky hyderabad okra roast": "/images/dishes/smoky_hyderabad_okra_roast.jpg",
  "zesty hyderabad chickpeas saag": "/images/dishes/zesty_hyderabad_chickpeas_saag.jpg",
  "rich hyderabad tofu fry": "/images/dishes/rich_hyderabad_tofu_fry.jpg",
  "creamy hyderabad mushroom bhuna": "/images/dishes/creamy_hyderabad_mushroom_bhuna.jpg",
  "royal hyderabad prawns bhuna": "/images/dishes/royal_hyderabad_prawns_bhuna.jpg",
  "rogan josh": "/images/dishes/rogan_josh.jpg",
  "yakhni": "/images/dishes/yakhni.jpg",
  "dum aloo": "/images/dishes/dum_aloo.jpg",
  "gushtaba": "/images/dishes/gushtaba.jpg",
  "kahwa": "/images/dishes/kahwa.jpg",
  "royal kashmir cauliflower tikka": "/images/dishes/royal_kashmir_cauliflower_tikka.jpg",
  "royal kashmir tofu saag": "/images/dishes/royal_kashmir_tofu_saag.jpg",
  "signature kashmir chicken bhuna": "/images/dishes/signature_kashmir_chicken_bhuna.jpg",
  "authentic kashmir paneer saag": "/images/dishes/authentic_kashmir_paneer_saag.jpg",
  "tangy kashmir okra bhuna": "/images/dishes/tangy_kashmir_okra_bhuna.jpg",
  "classic kashmir paneer bhuna": "/images/dishes/classic_kashmir_paneer_bhuna.jpg",
  "spicy kashmir spinach kholapuri": "/images/dishes/spicy_kashmir_spinach_kholapuri.jpg",
  "rich kashmir spinach makhani": "/images/dishes/rich_kashmir_spinach_makhani.jpg",
  "creamy kashmir chickpeas masala": "/images/dishes/creamy_kashmir_chickpeas_masala.jpg",
  "fiery kashmir prawns biryani": "/images/dishes/fiery_kashmir_prawns_biryani.jpg",
  "homestyle kashmir eggplant bhuna": "/images/dishes/homestyle_kashmir_eggplant_bhuna.jpg",
  "homestyle kashmir fish tadka": "/images/dishes/homestyle_kashmir_fish_tadka.jpg",
  "smoky kashmir chickpeas bhuna": "/images/dishes/smoky_kashmir_chickpeas_bhuna.jpg",
  "goan fish curry": "/images/dishes/goan_fish_curry.jpg",
  "pork vindaloo": "/images/dishes/pork_vindaloo.jpg",
  "bebinca": "/images/dishes/bebinca.jpg",
  "chicken xacuti": "/images/dishes/chicken_xacuti.jpg",
  "prawn balchao": "/images/dishes/prawn_balchao.jpg",
};

const getDishImageFromTitle = (title) => {
  const s = typeof title === 'string'
    ? title
    : (title?.en || (Array.isArray(title) ? title[0] : Object.values(title || {})[0]));

  const normalizedTitle = (s || '').toLowerCase().trim();
  if (!normalizedTitle) return null;

  if (DISH_IMAGE_MAP[normalizedTitle]) return DISH_IMAGE_MAP[normalizedTitle];

  for (const [dishName, imageUrl] of Object.entries(DISH_IMAGE_MAP)) {
    if (normalizedTitle.includes(dishName)) return imageUrl;
  }

  return null;
};

export const getMappedDishImage = (recipe) => {
  // Agent 7 STRICT FIX: Always prefer the beautifully generated DB image first!
  if (recipe.image && typeof recipe.image === 'string' && recipe.image.trim().length > 0) {
    return recipe.image;
  }

  const titleText = typeof recipe.title === 'string'
    ? recipe.title
    : (recipe.title?.en || (Array.isArray(recipe.title) ? recipe.title[0] : Object.values(recipe.title || {})[0]));

  const mappedImage = getDishImageFromTitle(titleText);
  if (mappedImage) return mappedImage;

  const normalizedTitle = (titleText || '').trim();
  const query = normalizedTitle || 'food';
  const port = config?.port || 5000;
  return `/api/v1/images/generate?dish=${encodeURIComponent(query)}`;
};

export const mapDishImages = (recipes = []) => {
  return recipes.map((recipe) => ({
    ...recipe,
    image: getMappedDishImage(recipe),
  }));
};
