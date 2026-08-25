import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Users, Flame, ChefHat, CheckCircle2, Award, MapPin, Navigation, Star, Heart, Save, Printer, Lightbulb, RefreshCw, Activity, ArrowRight, Share2, UtensilsCrossed } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard.jsx";
import { Badge } from "../components/ui/Badge.jsx";
import { Button } from "../components/ui/Button.jsx";
import { FadeIn } from "../components/ui/FadeIn.jsx";
import { FlavorRadarChart } from "../components/flavor/FlavorRadarChart.jsx";
import { api, recipeApi } from "../services/api.js";
import { useTranslation } from "react-i18next";
import { DishImage } from "../components/common/DishImage.jsx";

const RESTAURANT_FILTERS = [
  { id: "Nearest", labelKey: "recipe.filters.nearest" },
  { id: "Highest Rated", labelKey: "recipe.filters.highestRated" },
  { id: "Price: Low to High", labelKey: "recipe.filters.priceLowHigh" },
  { id: "Most Popular", labelKey: "recipe.filters.mostPopular" }
];

export const RecipeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en';
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Nearest");

  useEffect(() => {
    recipeApi.getById(id).then((res) => {
      setRecipe(res.data.data.recipe);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [id]);

  if (loading || !recipe) {
    return (
      <div className="max-w-6xl mx-auto py-32 text-center text-slate-500">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        {t('search.loading')}
      </div>
    );
  }

  // Generate Google Maps embed URL for the dish
  const titleText = recipe.title?.[currentLang] || recipe.title?.en || recipe.title;
  const mapUrl = `https://maps.google.com/maps?q=indian+restaurants+serving+${encodeURIComponent(titleText)}&t=&z=12&ie=UTF8&iwloc=&output=embed&hl=${currentLang}`;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      
      {/* Massive Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <DishImage dishName={recipe.title?.en || recipe.title} imageUrl={recipe.image} className="absolute inset-0 transition-transform duration-1000 scale-105 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        
        <div className="absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-center z-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 bg-white/20 hover:bg-white/40 backdrop-blur-md px-4 py-2 rounded-full text-white transition-colors">
            <ArrowLeft size={18} /> {t('recipe.back')}
          </button>
          <div className="flex gap-3">
            <button className="bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white transition-colors" title="Print Recipe">
              <Printer size={20} />
            </button>
            <button className="bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white transition-colors" title="Share Recipe">
              <Share2 size={20} />
            </button>
            <button className="bg-white/20 hover:bg-emerald-500/80 backdrop-blur-md p-3 rounded-full text-white transition-colors" title="Save Recipe">
              <Save size={20} />
            </button>
            <button className="bg-white/20 hover:bg-rose-500/80 backdrop-blur-md p-3 rounded-full text-white transition-colors" title="Like Recipe">
              <Heart size={20} />
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 max-w-6xl mx-auto w-full z-10">
          <FadeIn>
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="emerald" className="backdrop-blur-md bg-emerald-500/30 text-white border-white/20">
                <Award size={14} className="mr-1 inline" /> {recipe.authenticityScore}% {t('recipe.authentic')}
              </Badge>
              <Badge variant="amber" className="backdrop-blur-md bg-amber-500/30 text-white border-white/20">
                {t('recipe.northIndian')}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {titleText}
            </h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-3xl drop-shadow-md">
              {recipe.description?.[currentLang] || recipe.description?.en || recipe.description || recipe.desc}
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        
        {/* Quick Stats Bar */}
        <FadeIn delay={0.1}>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 flex flex-wrap gap-8 justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><Clock size={24} /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{t('recipe.totalTime')}</p>
                <p className="text-lg font-bold text-slate-900">{recipe.total_time || recipe.time}m</p>
              </div>
            </div>
            <div className="w-px h-12 bg-slate-100 hidden md:block"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center text-violet-600"><Users size={24} /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{t('recipe.servings')}</p>
                <p className="text-lg font-bold text-slate-900">{recipe.servings} {t('recipe.people')}</p>
              </div>
            </div>
            <div className="w-px h-12 bg-slate-100 hidden md:block"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600"><Flame size={24} /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{t('recipe.difficulty')}</p>
                <p className="text-lg font-bold text-slate-900">{recipe.difficulty}</p>
              </div>
            </div>
            <div className="w-px h-12 bg-slate-100 hidden md:block"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600"><Activity size={24} /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Nutrition</p>
                <p className="text-lg font-bold text-slate-900">{recipe.calories || '450'} kcal • {recipe.protein || '15'}g P</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Instructions */}
          <div className="lg:col-span-2 space-y-12">
            <FadeIn delay={0.2}>
              <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3 text-slate-900">
                <ChefHat className="text-primary" size={32} /> {t('recipe.instructionsTitle')}
              </h2>
              <div className="space-y-8">
                {(recipe.instructions?.[currentLang] || recipe.instructions?.en || recipe.instructions || []).map((step, idx) => (
                  <div key={idx} className="flex gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-display font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-slate-700 leading-relaxed pt-3 text-lg">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                  <h3 className="text-xl font-display font-bold flex items-center gap-2 mb-4 text-amber-900">
                    <Lightbulb className="text-amber-500" size={24}/> Cooking Tips
                  </h3>
                  <ul className="space-y-2 text-amber-800 text-sm">
                    <li>• Marinate the protein for at least 2 hours for best results.</li>
                    <li>• Use a heavy-bottomed pan to prevent burning the spices.</li>
                    <li>• Adjust the chili powder according to your spice tolerance.</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                  <h3 className="text-xl font-display font-bold flex items-center gap-2 mb-4 text-indigo-900">
                    <RefreshCw className="text-indigo-500" size={24}/> Ingredient Substitutions
                  </h3>
                  <ul className="space-y-2 text-indigo-800 text-sm">
                    <li>• Ghee can be substituted with unsalted butter or oil.</li>
                    <li>• If tomatoes are too sour, add a pinch of sugar.</li>
                    <li>• Paneer can be swapped with extra firm tofu for a vegan option.</li>
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Ingredients & Radar */}
          <div className="space-y-8">
            <FadeIn delay={0.3}>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg">
                <h3 className="text-2xl font-display font-bold mb-6 text-slate-900">
                  {t('recipe.ingredientsTitle')}
                </h3>
                <ul className="space-y-4">
                  {(recipe.ingredientDetails || []).map((ing, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-slate-700 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                        <img src={ing.image} alt={ing.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <span className="text-lg font-medium text-slate-800">{ing.name}</span>
                      </div>
                      <span className="text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full text-sm">{ing.quantity}</span>
                    </li>
                  ))}
                  {!recipe.ingredientDetails && (recipe.ingredients?.[currentLang] || recipe.ingredients?.en || recipe.ingredients || []).map((ing, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-slate-700 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                      <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-lg">{ing}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-8 bg-slate-900 hover:bg-slate-800 text-white font-medium py-4 rounded-xl transition-colors">
                  {t('recipe.addToShoppingList')}
                </button>
              </div>
            </FadeIn>

            {recipe.equipment && (
              <FadeIn delay={0.35} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg">
                <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2 text-slate-900">
                  <UtensilsCrossed className="text-slate-500" size={24} /> Cooking Equipment
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.equipment.map((eq, idx) => (
                    <span key={idx} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-sm font-medium shadow-sm">
                      {eq}
                    </span>
                  ))}
                </div>
              </FadeIn>
            )}

            <FadeIn delay={0.4} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg">
              <h3 className="text-xl font-display font-bold mb-2 text-slate-900">{t('recipe.flavorProfile')}</h3>
              <p className="text-sm text-slate-500 mb-6">{t('recipe.flavorDesc')}</p>
              <div className="h-64">
                <FlavorRadarChart data={recipe.radarData} name1={t('recipe.dishProfile')} />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Related Recipes Placeholder */}
        <FadeIn delay={0.45} className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold text-slate-900">Related Recipes</h2>
            <button className="text-primary font-medium flex items-center gap-1 hover:text-emerald-700 transition-colors">See all <ArrowRight size={16}/></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm group cursor-pointer hover:shadow-md transition-all">
                <div className="h-48 bg-slate-200 overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80&sig=${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg text-slate-900">Delicious Indian Dish</h4>
                  <p className="text-slate-500 text-sm mt-1">Ready in 45 mins • Highly Rated</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Restaurants Section (Google Maps Embed) */}
        <FadeIn delay={0.5} className="mt-24">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">{t('recipe.restaurantsServing')}</h2>
              <p className="text-slate-500 text-lg">{t('recipe.dontWantToCook', { title: titleText })}</p>
            </div>
            
            <div className="flex bg-white rounded-full p-1 shadow-sm border border-slate-200 overflow-x-auto max-w-full hide-scrollbar">
              {RESTAURANT_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeFilter === filter.id ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {t(filter.labelKey)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
            {/* Map Column */}
            <div className="lg:col-span-2 bg-slate-200 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
              <iframe
                title="Google Maps"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={mapUrl}
                allowFullScreen
              ></iframe>
            </div>

            {/* Simulated Restaurant List */}
            <div className="bg-white rounded-3xl p-2 shadow-lg border border-slate-200 overflow-y-auto">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="p-4 hover:bg-slate-50 rounded-2xl cursor-pointer transition-colors border-b border-slate-100 last:border-0 flex gap-4">
                  <div className="w-24 h-24 bg-slate-200 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=150&q=80&sig=${item}`} alt="Restaurant" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-bold text-slate-900 mb-1">Authentic Curry House</h4>
                    <div className="flex items-center gap-1 text-sm text-slate-500 mb-2">
                      <Star size={14} className="text-amber-500 fill-amber-500" /> 4.8 <span className="mx-1">•</span> <MapPin size={14} /> 1.2 mi
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{t('recipe.openNow')}</span>
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">$$</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
