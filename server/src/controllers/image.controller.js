
// High-quality static fallbacks for common Indian dishes
const DISH_IMAGE_MAP = [
  { pattern: /\bbutter chicken\b|\bmurgh makhani\b/i, url: 'https://images.unsplash.com/photo-1516685018646-549d7ab35f5d?auto=format&fit=crop&w=900&q=80' },
  { pattern: /\bmasala dosa\b|\bdosa\b/i, url: 'https://images.unsplash.com/photo-1543255006-09d4d126da5d?auto=format&fit=crop&w=900&q=80' },
  { pattern: /\bpalak paneer\b|\bpaneer butter masala\b|\bkadai paneer\b|\bshahi paneer\b|\bpaneer tikka\b|\bpaneer\b/i, url: 'https://images.unsplash.com/photo-1620180965581-51d304798fee?auto=format&fit=crop&w=900&q=80' },
  { pattern: /\bhyderabadi dum biryani\b|\bbiryani\b/i, url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80' },
  { pattern: /\bdal makhani\b|\bdal tadka\b|\bdal\b/i, url: 'https://images.unsplash.com/photo-1597301062301-65c7c7cb3a93?auto=format&fit=crop&w=900&q=80' },
  { pattern: /\baloo gobi\b|\bgobi\b/i, url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=900&q=80' },
  { pattern: /\bchole\b|\bchana masala\b|\bbhature\b/i, url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80' },
  { pattern: /\bmasala chai\b|\bchai\b/i, url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80' },
  { pattern: /\bfish curry\b|\bmeen moilee\b|\bkerala\b|\bseafood\b/i, url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80' },
  { pattern: /\bchicken\b/i, url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80' },
  { pattern: /\bveg\b|\bvegetable\b|\bvegetarian\b/i, url: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=900&q=80' },
];

const RECIPE_IMAGE_FALLBACKS = [
  'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80',
];

// Cache to prevent spamming the APIs
const imageCache = new Map();

export const generateImage = async (req, res) => {
  // Prevent browser from aggressively caching failed redirects, but allow caching successful images
  res.setHeader('Cache-Control', 'public, max-age=86400');

  try {
    const dish = req.query.dish || 'food';
    const normalizedDish = dish.toLowerCase().trim();

    let finalImageUrl = null;

    if (imageCache.has(normalizedDish)) {
      finalImageUrl = imageCache.get(normalizedDish);
    } else {
      const pexelsKey = process.env.PEXELS_API_KEY;
      let foundPexels = false;

      if (pexelsKey) {
        try {
          const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(normalizedDish + ' food dish')}&per_page=1`, {
            headers: { Authorization: pexelsKey },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.photos && data.photos.length > 0) {
              finalImageUrl = data.photos[0].src.large;
              imageCache.set(normalizedDish, finalImageUrl);
              foundPexels = true;
            }
          }
        } catch (err) {
          console.error('Pexels API Error, falling back:', err.message);
        }
      }

      if (!foundPexels) {
        // Free Wikipedia Commons image search API (no key required)
        try {
          const removeWords = [
            "fiery", "creamy", "authentic", "rich", "robust", "zesty", "homestyle", "classic", "royal", "special", "tangy", "spicy", "sweet", "flavorful", "delicious", "hearty", "traditional", "famous", "popular",
            "punjab", "punjabi", "kerala", "gujarat", "gujarati", "west bengal", "bengal", "bengali", "delhi", "kashmir", "kashmiri", "assam", "assamese", "odisha", "odia", "maharashtra", "maharashtrian", "goan", "goa", "indian", "karnataka", "andhra", "tamil nadu", "tamil", "rajasthan", "rajasthani", "bihar", "bihari", "up", "uttar pradesh", "hyderabad", "hyderabadi", "lucknow", "lucknowi", "awadh", "awadhi", "chettinad", "south indian", "north indian"
          ];
          let coreDishName = normalizedDish;
          for (const word of removeWords) {
            coreDishName = coreDishName.replace(new RegExp(`\\b${word}\\b`, 'gi'), '').trim();
          }
          coreDishName = coreDishName.replace(/\s+/g, ' ');
          
          const wikiQuery = coreDishName.split(' ').slice(0, 3).join(' ') + ' dish';
          const wikiRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(wikiQuery)}&prop=pageimages&pithumbsize=800&format=json`, {
            headers: { 'User-Agent': 'FlavorMind-App/1.0' }
          });
          if (wikiRes.ok) {
            const wikiData = await wikiRes.json();
            if (wikiData.query && wikiData.query.pages) {
              const pages = Object.values(wikiData.query.pages);
              const pageWithImage = pages.find(p => p.thumbnail && p.thumbnail.source);
              if (pageWithImage) {
                finalImageUrl = pageWithImage.thumbnail.source;
                imageCache.set(normalizedDish, finalImageUrl);
              }
            }
          }
        } catch (wikiErr) {
          console.error('Wikipedia API Error:', wikiErr.message);
        }
      }

      if (!finalImageUrl) {
        // High-quality static fallback logic if no Pexels API key is present and Wikipedia fails
        const matchedEntry = DISH_IMAGE_MAP.find((entry) => entry.pattern.test(normalizedDish));
        if (matchedEntry) {
          finalImageUrl = matchedEntry.url;
        } else {
          let hash = 0;
          for (let i = 0; i < normalizedDish.length; i++) {
            hash = normalizedDish.charCodeAt(i) + ((hash << 5) - hash);
          }
          const index = Math.abs(hash) % RECIPE_IMAGE_FALLBACKS.length;
          finalImageUrl = RECIPE_IMAGE_FALLBACKS[index];
        }
        imageCache.set(normalizedDish, finalImageUrl);
      }
    }

    // Proxy the image bytes directly so the browser doesn't block it (fixes CORS, referers, redirect drops)
    try {
      const imgRes = await fetch(finalImageUrl, {
        headers: { 'User-Agent': 'FlavorMind-App/1.0' }
      });
      if (imgRes.ok) {
        const arrayBuffer = await imgRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Use Express's res.set to prevent res.end/send from overwriting it
        res.set('Content-Type', imgRes.headers.get('content-type') || 'image/jpeg');
        res.set('Content-Length', buffer.length);
        // Allow cross-origin requests to load this image (overrides helmet defaults)
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
        
        // Use res.end() to send raw binary data reliably
        return res.end(buffer);
      } else {
        return res.redirect(302, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80');
      }
    } catch (fetchErr) {
      console.error('Failed to proxy image:', fetchErr);
      return res.redirect(302, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80');
    }
    
  } catch (error) {
    console.error('Image Generation Error:', error);
    res.redirect(302, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80');
  }
};
