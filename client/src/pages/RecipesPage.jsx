import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard.jsx";
import { Badge } from "../components/ui/Badge.jsx";
import { Input } from "../components/ui/Input.jsx";
import { Clock, Users, Flame, Search, Star, Sparkles, Activity } from "lucide-react";
import { api } from "../services/api.js";
import { useTranslation } from "react-i18next";
import { DishImage } from "../components/common/DishImage.jsx";

const SMART_FILTERS = [
  "Healthy", "Spicy", "Sweet", "Street Food", "North Indian", "South Indian", 
  "Gujarati", "Punjabi", "Maharashtrian", "High Protein", "Low Calories", 
  "Quick Recipes", "Budget Friendly", "Festival Food", "Kids Special", 
  "Breakfast", "Lunch", "Dinner", "Late Night", "Veg", "Non Veg"
];

const SkeletonCard = () => (
  <div className="h-96 rounded-3xl bg-slate-100 animate-pulse relative overflow-hidden border border-slate-200 shadow-sm">
    <div className="absolute top-4 left-4 right-4 flex justify-between">
      <div className="w-16 h-6 bg-slate-200 rounded-full"></div>
      <div className="w-20 h-6 bg-slate-200 rounded-full"></div>
    </div>
    <div className="absolute bottom-5 left-5 right-5 space-y-4">
      <div className="w-full h-12 bg-slate-200 rounded-lg"></div>
      <div className="w-3/4 h-6 bg-slate-200 rounded-lg"></div>
      <div className="w-full h-4 bg-slate-200 rounded-lg"></div>
      <div className="w-2/3 h-4 bg-slate-200 rounded-lg"></div>
    </div>
  </div>
);

export const RecipesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(location.state?.globalSearch || "");
  const initialInventory = location.state?.inventory || [];

  useEffect(() => {
    if (location.state?.globalSearch !== undefined) {
      setSearchQuery(location.state.globalSearch);
    }
  }, [location.state?.globalSearch]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        let response;
        if (initialInventory.length > 0) {
          response = await api.post('/recipes/recommendations', { 
            inventory: initialInventory,
            searchQuery: searchQuery
          });
        } else {
          response = await api.get(`/recipes/search?q=${encodeURIComponent(searchQuery)}`);
        }
        setRecipes(response.data.data.recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    // Simple debounce for search
    const delayDebounceFn = setTimeout(() => {
      fetchRecipes();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialInventory.join(','), searchQuery]);
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">
            {t('search.title')}
          </h1>
          <p className="text-slate-500 mt-1">
            {t('search.subtitle')}{" "}
            {initialInventory.length > 0
              ? t('search.inventory')
              : t('search.expert')}
          </p>
        </div>
        <div className="w-full md:w-72">
          <Input
            placeholder={t('search.placeholder')}
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {SMART_FILTERS.map(filter => (
          <button 
            key={filter} 
            onClick={() => setSearchQuery(filter)} 
            className={`px-4 py-1.5 rounded-full text-sm font-medium border ${searchQuery.toLowerCase() === filter.toLowerCase() ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary shadow-sm'} transition-all`}
          >
            {filter}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <motion.div
                key={recipe.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
              <GlassCard
                interactive
                onClick={() => navigate(`/recipe/${recipe.id}`)}
                className="group relative h-96 overflow-hidden rounded-3xl"
              >
                {/* Abstract Indian Spices Background */}
                <DishImage 
                  dishName={recipe.title?.en || recipe.title} 
                  imageUrl={recipe.image}
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 z-0" 
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/80 to-transparent"></div>
                
                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  <Badge variant={recipe.isVeg ? "success" : "danger"}>{recipe.isVeg ? "Veg" : "Non Veg"}</Badge>
                  {recipe.cuisine && <Badge variant="primary">{recipe.cuisine}</Badge>}
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  {recipe.recommendationReason && (
                    <div className="mb-3 px-3 py-2 bg-emerald-500/20 backdrop-blur-md rounded-lg border border-emerald-500/30 flex items-start gap-2">
                      <Sparkles size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                      <p className="text-emerald-50 text-xs font-medium leading-relaxed">{recipe.recommendationReason}</p>
                    </div>
                  )}
                  <h2 className="text-2xl font-display font-bold text-slate-50 mb-2 group-hover:text-primary transition-colors">
                    {recipe.title?.[i18n.language?.split('-')[0]] || recipe.title?.en || recipe.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-300 mb-3">
                    <span className="flex items-center gap-1"><Clock size={14} /> {recipe.total_time || (recipe.prep_time + recipe.cook_time)}m</span>
                    <span className="flex items-center gap-1 text-amber-400"><Star size={14} className="fill-amber-400"/> {recipe.rating}</span>
                    <span className="flex items-center gap-1 text-emerald-400"><Flame size={14} /> {recipe.authenticityScore}% Authentic</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 border-t border-white/10 pt-3">
                    <span className="flex items-center gap-1"><Activity size={14} /> {recipe.calories} kcal</span>
                    <span>•</span>
                    <span>{recipe.protein}g Protein</span>
                    <span>•</span>
                    <span>{recipe.state || 'India'}</span>
                    <span>•</span>
                    <span>{recipe.difficulty}</span>
                  </div>
                </div>
              </GlassCard>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate-500">
              {t('search.noDishes')}
            </div>
          )}
        </motion.div>
      )} 
    </div>
  );
};
