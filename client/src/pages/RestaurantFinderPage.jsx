import React, { useState, useEffect } from "react";
import { FadeIn } from "../components/ui/FadeIn.jsx";
import { GlassCard } from "../components/ui/GlassCard.jsx";
import { Input } from "../components/ui/Input.jsx";
import { Badge } from "../components/ui/Badge.jsx";
import { InteractiveMap } from "../components/ui/InteractiveMap.jsx";
import { CityAutocomplete } from "../components/ui/CityAutocomplete.jsx";
import { Search, MapPin, Navigation, Star, IndianRupee, Phone, ArrowRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { restaurantApi } from "../services/api.js";

const FILTERS = ["Veg", "Non Veg", "Pure Veg", "Family", "Cafe", "Street Food", "Fine Dining", "Buffet", "Outdoor Seating", "Home Delivery", "Take Away", "Open Now"];
const SORTS = ["Highest Rated", "Nearest", "Lowest Price", "Most Popular", "Most Reviewed", "Open Now"];

export const RestaurantFinderPage = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("Mumbai");
  const [dish, setDish] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeSort, setActiveSort] = useState("Highest Rated");
  const [restaurants, setRestaurants] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 19.0760, lng: 72.8777 });
  const [nextPageToken, setNextPageToken] = useState(null);
  const [fallbackMessage, setFallbackMessage] = useState("");

  const fetchRestaurants = async (isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setFallbackMessage("");
      setNextPageToken(null);
    }
    
    try {
      const params = {
        city,
        lat: mapCenter.lat,
        lng: mapCenter.lng,
        dish,
        sort: activeSort,
        filters: activeFilters.join(",")
      };
      if (isLoadMore && nextPageToken) {
        params.pageToken = nextPageToken;
      }

      const res = await restaurantApi.search(params);
      const data = res.data.data.restaurants;
      
      if (isLoadMore) {
        setRestaurants(prev => [...prev, ...data]);
      } else {
        setRestaurants(data);
      }
      
      setNextPageToken(res.data.data.nextPageToken);
      if (res.data.data.fallbackMessage) {
        setFallbackMessage(res.data.data.fallbackMessage);
      }
      
      // Only set map center from first restaurant if not paginating
      if (!isLoadMore && data.length > 0 && city !== "") {
        // Center logic
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchRestaurants();
    }, 400);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, dish, activeFilters, activeSort]);

  const toggleFilter = (filter) => {
    setActiveFilters(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]);
  };

  const handleCitySelect = (cityName, coords) => {
    setCity(cityName);
    if (coords) {
      setMapCenter(coords);
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-6rem)] flex flex-col px-4 pb-4">
      <FadeIn className="mb-4 shrink-0">
        <h1 className="text-3xl font-display font-bold tracking-tight mb-2">
          Restaurant Locator
        </h1>
        <p className="text-slate-500">
          Find top-rated restaurants matching your exact cravings.
        </p>
      </FadeIn>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1 min-h-0">
        
        {/* Left Col: Search, Filters & List */}
        <div className="lg:col-span-2 flex flex-col gap-4 overflow-hidden h-full">
          {/* Search Bars */}
          <div className="flex flex-col gap-3 shrink-0">
            <CityAutocomplete
              value={city}
              onSelect={handleCitySelect}
              className="bg-white"
            />
            <Input
              icon={Search}
              placeholder="Search Dish (e.g. Dal Makhani, Masala Dosa...)"
              value={dish}
              onChange={(e) => setDish(e.target.value)}
              className="bg-white border-emerald-500/30 focus:border-emerald-500 shadow-sm"
            />
          </div>

          {/* Sort & Filters */}
          <div className="flex flex-col gap-2 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">Sort by:</span>
              <select 
                className="text-sm bg-white border border-slate-200 rounded-lg px-2 py-1 outline-none focus:border-emerald-500 cursor-pointer"
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
              >
                {SORTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto custom-scrollbar pr-1 pb-1">
              {FILTERS.map(filter => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-full border transition-all ${
                    activeFilters.includes(filter) 
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" 
                      : "bg-white text-slate-600 border-slate-200 hover:border-emerald-400"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Restaurant List */}
          <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2 mt-2">
            {fallbackMessage && (
              <div className="bg-amber-50 text-amber-800 p-3 rounded-xl text-sm border border-amber-200">
                {fallbackMessage}
              </div>
            )}
            {loading ? (
              <div className="text-center text-slate-500 text-sm py-10 flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                Finding best spots...
              </div>
            ) : restaurants.length === 0 ? (
              <FadeIn className="text-center py-10 flex flex-col items-center justify-center h-full">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                  <AlertCircle size={32} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No restaurants found</h3>
                <p className="text-slate-500 text-sm mb-6 max-w-[250px]">
                  {dish 
                    ? `No restaurants found serving "${dish}" in ${city}.` 
                    : `We couldn't find any restaurants matching your filters in ${city}.`}
                </p>
                <div className="w-full text-left bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Try suggesting:</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Satara", "Vadodara", "Shindkheda", "Shirpur", "Bhatinda", "Chandigarh", "Ahmedabad"].map(c => (
                      <button 
                        key={c}
                        onClick={() => setCity(c)} 
                        className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:border-emerald-500 hover:text-emerald-700 transition-colors"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ) : (
              restaurants.map((rest) => (
                <GlassCard
                  key={rest.id}
                  interactive
                  className={`p-0 overflow-hidden flex flex-col transition-all duration-300 ${hoveredId === rest.id ? 'ring-2 ring-emerald-500 shadow-lg scale-[1.01]' : ''}`}
                  onMouseEnter={() => setHoveredId(rest.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setMapCenter(rest.coords)}
                >
                  {/* Card Header (Image & Tags) */}
                  <div className="h-32 relative bg-slate-200">
                    <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 flex gap-1">
                      {rest.categories.includes("Veg") || rest.categories.includes("Pure Veg") ? (
                        <Badge variant="success" className="shadow-sm py-0.5 px-1.5 text-[10px]">Veg</Badge>
                      ) : null}
                      <Badge variant="primary" className="shadow-sm py-0.5 px-1.5 text-[10px]">{rest.cuisine}</Badge>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Badge variant={rest.isOpen ? "success" : "danger"} className="shadow-sm py-0.5 px-1.5 text-[10px] backdrop-blur-md">
                        {rest.isOpen ? "Open Now" : "Closed"}
                      </Badge>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-slate-900 text-lg leading-tight flex-1">
                        {rest.name}
                      </h3>
                      {rest.currentRecommendedDish && (
                         <Badge variant="emerald" className="bg-emerald-50 text-emerald-700 border-emerald-200 shrink-0">
                           {rest.currentRecommendedDish.match}% Match
                         </Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center font-medium text-slate-700">
                        <Star size={14} className="text-amber-400 mr-1 fill-amber-400" /> 
                        {rest.rating} <span className="text-slate-400 font-normal ml-1">({rest.reviews}+)</span>
                      </span>
                      <span className="flex items-center text-emerald-600 font-medium tracking-tighter">
                        {Array.from({ length: rest.priceLevel }).map((_, i) => <IndianRupee size={12} key={i} className="-mr-0.5"/>)}
                      </span>
                      <span className="flex items-center">
                        <MapPin size={12} className="mr-1" /> {rest.distanceKm} km
                      </span>
                    </div>

                    {rest.currentRecommendedDish && (
                      <div className="mt-2 p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50/30 border border-emerald-100 flex justify-between items-center group">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-0.5">Top Match</span>
                          <span className="text-slate-900 font-semibold text-sm">{rest.currentRecommendedDish.name}</span>
                        </div>
                        <span className="text-sm font-bold text-emerald-700">₹{rest.currentRecommendedDish.price}</span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 mt-2 pt-3 border-t border-slate-100">
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigate(`/restaurant/${rest.id}`); }}
                        className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        View Details <ArrowRight size={12} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); window.open(`https://maps.google.com/?q=${rest.coords.lat},${rest.coords.lng}`, '_blank'); }}
                        className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
                        title="Directions"
                      >
                        <Navigation size={16} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${rest.phone}`; }}
                        className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
                        title="Call"
                      >
                        <Phone size={16} />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              ))
            )}
            
            {!loading && nextPageToken && (
              <div className="py-4 flex justify-center">
                <button 
                  onClick={() => fetchRestaurants(true)}
                  disabled={loadingMore}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2 rounded-full font-medium transition-colors text-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {loadingMore ? (
                    <><div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> Loading...</>
                  ) : (
                    'Load More'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Col: Map View */}
        <div className="lg:col-span-3 relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-glass-light h-full">
          <InteractiveMap 
            restaurants={restaurants} 
            hoveredId={hoveredId} 
            defaultCenter={mapCenter}
            onMarkerClick={(id) => {
              setHoveredId(id);
              const element = document.getElementById(id);
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
