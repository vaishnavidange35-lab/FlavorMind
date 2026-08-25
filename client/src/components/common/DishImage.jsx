import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const CATEGORY_POOLS = {
  paneer: ["/images/fallback/paneer.png"],
  mushroom: ["/images/fallback/paneer.png"],
  chicken: ["/images/fallback/chicken.png"],
  spinach_saag: ["/images/fallback/veg.png"],
  eggplant_baingan: ["/images/fallback/veg.png"],
  mutton_meat: ["/images/fallback/chicken.png"],
  fish_seafood: ["/images/fallback/chicken.png"],
  biryani_rice: ["/images/fallback/biryani.png"],
  dosa_south_indian: ["/images/fallback/veg.png"],
  dal_lentils: ["/images/fallback/veg.png"],
  sweets_desserts: ["/images/fallback/veg.png"]
};

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getAccurateFallback(dishName = '') {
  const title = (dishName || '').toLowerCase();
  let key = 'dal_lentils';

  if (title.includes('paneer')) key = 'paneer';
  else if (title.includes('mushroom') || title.includes('gassi')) key = 'mushroom';
  else if (title.includes('chicken') || title.includes('murg') || title.includes('tikka') || title.includes('tandoori')) key = 'chicken';
  else if (title.includes('saag') || title.includes('palak') || title.includes('spinach')) key = 'spinach_saag';
  else if (title.includes('eggplant') || title.includes('baingan') || title.includes('bharta') || title.includes('bhuna')) key = 'eggplant_baingan';
  else if (title.includes('mutton') || title.includes('lamb') || title.includes('rogan') || title.includes('kebab')) key = 'mutton_meat';
  else if (title.includes('fish') || title.includes('prawn') || title.includes('karimeen') || title.includes('seafood')) key = 'fish_seafood';
  else if (title.includes('biryani') || title.includes('pulao') || title.includes('rice')) key = 'biryani_rice';
  else if (title.includes('dosa') || title.includes('idli') || title.includes('appam') || title.includes('puttu') || title.includes('sambar') || title.includes('pongal')) key = 'dosa_south_indian';
  else if (title.includes('sweet') || title.includes('gulab') || title.includes('jalebi') || title.includes('kheer') || title.includes('payasam') || title.includes('modak') || title.includes('halwa') || title.includes('poli')) key = 'sweets_desserts';

  const pool = CATEGORY_POOLS[key] || CATEGORY_POOLS.dal_lentils;
  const index = hashString(title) % pool.length;
  return pool[index];
}

const fetchPixabayImage = async (dishName) => {
    if (!dishName) return getAccurateFallback(dishName);
    try {
        const response = await axios.get(`/api/v1/images/pixabay`, {
            params: { dish: dishName }
        });
        return response.data.imageUrl;
    } catch {
        return getAccurateFallback(dishName);
    }
};

function getLocalDishImage(dishName = '') {
  if (!dishName) return null;
  const name = dishName.toLowerCase();
  if (name.includes('karimeen') || name.includes('pollichathu')) return '/images/dishes/karimeen_pollichathu.jpg';
  if (name.includes('palada') || name.includes('payasam')) return '/images/dishes/palada_payasam.jpg';
  if (name.includes('idli') && name.includes('sambar')) return '/images/dishes/idli_sambar.jpg';
  if (name.includes('idli') && !name.includes('sambar')) return '/images/dishes/idli_sambar.jpg';
  if (name.includes('masala') && name.includes('dosa')) return '/images/dishes/masala_dosa.jpg';
  if (name.includes('chettinad') && name.includes('chicken')) return '/images/dishes/chettinad_chicken.jpg';
  if (name.includes('ven') && name.includes('pongal')) return '/images/dishes/ven_pongal.jpg';
  if (name.includes('pongal')) return '/images/dishes/ven_pongal.jpg';
  if (name.includes('medu') && name.includes('vada')) return '/images/dishes/medu_vada.jpg';
  if (name.includes('vada') && name.includes('medu')) return '/images/dishes/medu_vada.jpg';
  if (name.includes('dhokla')) return '/images/dishes/dhokla.jpg';
  if (name.includes('khaman')) return '/images/dishes/khaman.jpg';
  if (name.includes('thepla')) return '/images/dishes/thepla.jpg';
  if (name.includes('lal maas') || name.includes('lal_maas') || name.includes('laal') || name.includes('maas')) return '/images/dishes/lal_maas.jpg';
  if (name.includes('basundi')) return '/images/dishes/basundi.jpg';
  if (name.includes('vindaloo') && name.includes('paneer')) return '/images/dishes/paneer_vindaloo.jpg';
  if (name.includes('vindaloo')) return '/images/dishes/pork_vindaloo.jpg';
  if (name.includes('mushroom') || name.includes('gassi') || name.includes('kerala mushroom')) return '/images/dishes/kerala_mushroom_gassi.jpg';
  if (name.includes('rogan') || name.includes('josh')) return '/images/dishes/rogan_josh.jpg';
  if (name.includes('yakhni')) return '/images/dishes/yakhni.jpg';
  if (name.includes('dum aloo') || (name.includes('dum') && name.includes('aloo'))) return '/images/dishes/dum_aloo.jpg';
  if (name.includes('gushtaba')) return '/images/dishes/gushtaba.jpg';
  if (name.includes('kahwa')) return '/images/dishes/kahwa.jpg';
  if (name.includes('cauliflower') && name.includes('tikka') && name.includes('kashmir')) return '/images/dishes/royal_kashmir_cauliflower_tikka.jpg';
  if (name.includes('tofu') && name.includes('saag') && name.includes('kashmir')) return '/images/dishes/royal_kashmir_tofu_saag.jpg';
  if (name.includes('chicken') && name.includes('bhuna') && name.includes('kashmir')) return '/images/dishes/signature_kashmir_chicken_bhuna.jpg';
  if (name.includes('paneer') && name.includes('saag') && name.includes('kashmir')) return '/images/dishes/authentic_kashmir_paneer_saag.jpg';
  if (name.includes('okra') && name.includes('bhuna') && name.includes('kashmir')) return '/images/dishes/tangy_kashmir_okra_bhuna.jpg';
  if (name.includes('paneer') && name.includes('bhuna') && name.includes('kashmir')) return '/images/dishes/classic_kashmir_paneer_bhuna.jpg';
  if (name.includes('spinach') && name.includes('kholapuri') && name.includes('kashmir')) return '/images/dishes/spicy_kashmir_spinach_kholapuri.jpg';
  if (name.includes('spinach') && name.includes('makhani') && name.includes('kashmir')) return '/images/dishes/rich_kashmir_spinach_makhani.jpg';
  if (name.includes('chickpeas') && name.includes('masala') && name.includes('kashmir')) return '/images/dishes/creamy_kashmir_chickpeas_masala.jpg';
  if (name.includes('prawn') && name.includes('biryani') && name.includes('kashmir')) return '/images/dishes/fiery_kashmir_prawns_biryani.jpg';
  if (name.includes('eggplant') && name.includes('bhuna') && name.includes('kashmir')) return '/images/dishes/homestyle_kashmir_eggplant_bhuna.jpg';
  if (name.includes('fish') && name.includes('tadka') && name.includes('kashmir')) return '/images/dishes/homestyle_kashmir_fish_tadka.jpg';
  if (name.includes('chickpeas') && name.includes('bhuna') && name.includes('kashmir')) return '/images/dishes/smoky_kashmir_chickpeas_bhuna.jpg';
  if (name.includes('goan') && name.includes('fish') && name.includes('curry')) return '/images/dishes/goan_fish_curry.jpg';
  if (name.includes('bebinca')) return '/images/dishes/bebinca.jpg';
  if (name.includes('xacuti')) return '/images/dishes/chicken_xacuti.jpg';
  if (name.includes('balchao')) return '/images/dishes/prawn_balchao.jpg';
  return null;
}

export const DishImage = ({ 
    dishName, 
    className, 
    alt, 
    fallbackUrl,
    imageUrl: providedImageUrl
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const categoryFallback = getAccurateFallback(dishName);
    const finalFallback = fallbackUrl || categoryFallback;

    const { data: fetchedImageUrl, isLoading, isError } = useQuery({
        queryKey: ['dishImage', dishName],
        queryFn: () => fetchPixabayImage(dishName),
        staleTime: 1000 * 60 * 60 * 24,
        retry: 1,
        enabled: !providedImageUrl // Only fetch if no URL is provided
    });

    const localImage = getLocalDishImage(dishName);
    const finalUrl = providedImageUrl || localImage || (isError || !fetchedImageUrl ? finalFallback : fetchedImageUrl);
    const skeletonClass = 'animate-pulse bg-slate-200 dark:bg-slate-700';

    return (
        <div className={`relative overflow-hidden ${className || ''}`}>
            {(isLoading || !imageLoaded) && (
                <div className={`absolute inset-0 ${skeletonClass} w-full h-full z-0`} />
            )}
            <img 
                src={finalUrl} 
                alt={alt || dishName}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                    e.target.src = finalFallback;
                    setImageLoaded(true);
                }}
                className={`w-full h-full object-cover transition-opacity duration-300 relative z-10 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            {/* 7th Agent UI Pivot: The Dynamic Unique Dish Overlay */}
            <div className={`absolute inset-0 z-20 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <h3 className="text-white font-black text-xl leading-tight drop-shadow-md">
                    {dishName}
                </h3>
            </div>
        </div>
    );
};
