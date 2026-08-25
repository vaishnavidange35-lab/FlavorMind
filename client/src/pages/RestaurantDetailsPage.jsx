import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { restaurantApi } from "../services/api.js";
import { FadeIn } from "../components/ui/FadeIn.jsx";
import { GlassCard } from "../components/ui/GlassCard.jsx";
import { Badge } from "../components/ui/Badge.jsx";
import { MapPin, Star, Clock, Phone, Globe, ArrowLeft, Navigation, ChefHat, Info } from "lucide-react";
import { InteractiveMap } from "../components/ui/InteractiveMap.jsx";

export const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await restaurantApi.getById(id);
        setRestaurant(res.data.data.restaurant);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-slate-500">Loading details...</div>;
  }

  if (!restaurant) {
    return <div className="text-center py-20 text-slate-500">Restaurant not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Search
      </button>

      {/* Hero Banner */}
      <FadeIn className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-glass-light border border-slate-200">
        <img src={restaurant.banner} alt={restaurant.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 right-6 md:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="success" className="bg-emerald-500/20 text-emerald-100 border-emerald-500/30 backdrop-blur-md">
                {restaurant.cuisine}
              </Badge>
              {restaurant.isOpen ? (
                <Badge variant="primary" className="bg-blue-500/20 text-blue-100 border-blue-500/30 backdrop-blur-md">
                  Open Now
                </Badge>
              ) : (
                <Badge variant="danger" className="bg-red-500/20 text-red-100 border-red-500/30 backdrop-blur-md">
                  Closed
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">{restaurant.name}</h1>
            <p className="text-slate-300 flex items-center gap-2">
              <MapPin size={16} /> {restaurant.address}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shrink-0">
            <div className="text-center px-4 border-r border-white/20">
              <div className="flex items-center justify-center text-amber-400 font-bold text-xl">
                {restaurant.rating} <Star size={20} className="fill-amber-400 ml-1" />
              </div>
              <div className="text-xs text-slate-300 mt-1">{restaurant.reviews} Reviews</div>
            </div>
            <div className="px-4 flex flex-col gap-2">
              <button 
                onClick={() => window.open(`https://maps.google.com/?q=${restaurant.coords.lat},${restaurant.coords.lng}`, '_blank')}
                className="flex items-center gap-2 text-xs font-medium text-white hover:text-emerald-400 transition-colors"
              >
                <Navigation size={14} /> Get Directions
              </button>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          
          {/* Quick Info & Categories */}
          <FadeIn delay={0.1}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Info size={20} className="text-emerald-600"/> About</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {restaurant.categories.map(c => (
                <Badge key={c} variant="outline" className="border-slate-200 text-slate-600 bg-white">
                  {c}
                </Badge>
              ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <GlassCard className="p-4 flex items-start gap-3">
                <Clock className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="text-sm font-semibold">Opening Hours</h4>
                  <p className="text-slate-500 text-sm">{restaurant.hours}</p>
                </div>
              </GlassCard>
              <GlassCard className="p-4 flex items-start gap-3">
                <Phone className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="text-sm font-semibold">Contact</h4>
                  <p className="text-slate-500 text-sm">{restaurant.phone}</p>
                </div>
              </GlassCard>
            </div>
          </FadeIn>

          {/* Popular Dishes */}
          <FadeIn delay={0.2}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><ChefHat size={20} className="text-emerald-600"/> Popular Dishes</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {restaurant.popularDishes.map((dish, i) => (
                <GlassCard key={i} interactive className="p-4 flex justify-between items-center group cursor-pointer" onClick={() => navigate('/recipes', { state: { globalSearch: dish.name } })}>
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">{dish.name}</h3>
                    <Badge variant="emerald" className="mt-2 text-[10px]">AI Match: {dish.match}%</Badge>
                  </div>
                  <span className="font-bold text-slate-700">₹{dish.price}</span>
                </GlassCard>
              ))}
            </div>
          </FadeIn>

          {/* Full Menu Preview */}
          <FadeIn delay={0.3}>
            <h2 className="text-xl font-bold mb-4">Menu Preview</h2>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <ul className="grid grid-cols-2 gap-y-3 text-slate-600">
                {restaurant.menu.map((m, i) => (
                  <li key={i} className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-emerald-500 before:rounded-full">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        {/* Sidebar: Map */}
        <FadeIn delay={0.4} className="md:col-span-1">
          <div className="sticky top-24">
            <h3 className="font-bold mb-3 flex items-center gap-2"><MapPin size={18} className="text-emerald-600"/> Location</h3>
            <div className="h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-4">
              <InteractiveMap restaurants={[restaurant]} hoveredId={restaurant.id} />
            </div>
            <p className="text-sm text-slate-500 mb-4">{restaurant.address}, {restaurant.city}</p>
            
            <a 
              href={`https://maps.google.com/?q=${restaurant.coords.lat},${restaurant.coords.lng}`} 
              target="_blank" 
              rel="noreferrer"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Open in Google Maps <Navigation size={16} />
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
