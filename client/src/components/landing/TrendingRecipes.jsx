import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FadeIn } from "../ui/FadeIn.jsx";
import { GlassCard } from "../ui/GlassCard.jsx";
import { Badge } from "../ui/Badge.jsx";
import { Flame, Star, TrendingUp, Heart, Search, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { recipeApi } from "../../services/api.js";
import { useTranslation } from "react-i18next";
import { DishImage } from "../common/DishImage.jsx";

const FILTER_TABS = [
  { id: "Top Rated", labelKey: "trending.filters.topRated", icon: Star },
  { id: "Most Authentic", labelKey: "trending.filters.mostAuthentic", icon: Award },
];

export const TrendingRecipes = () => {
  const [activeFilter, setActiveFilter] = useState("Top Rated");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { data: recipes = [], isLoading } = useQuery({
    queryKey: ["topDishes", activeFilter], 
    queryFn: () => recipeApi.getTop(activeFilter).then((res) => res.data.data.recipes), 
    staleTime: 1000 * 60 * 5
  });

  const displayRecipes = recipes.slice(0, 8);

  return (
    <section id="top-dishes" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-4 flex items-center gap-4">
              {t('trending.title')}
              <Flame className="text-rose-500" size={40} />
            </h2>
            <p className="text-lg text-slate-500">
              {t('trending.desc')}
            </p>
          </div>

          <div className="flex bg-white rounded-full p-1 shadow-sm border border-slate-200 overflow-x-auto">
            {FILTER_TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeFilter === tab.id
                      ? "bg-rose-500 text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={16} /> <span className="hidden sm:inline">{t(tab.labelKey)}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="h-96 rounded-3xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayRecipes.map((item, i) => (
              <FadeIn key={item.id} delay={0.1 * i}>
                <GlassCard
                  interactive
                  onClick={() => navigate(`/recipe/${item.id}`)}
                  className="p-3 flex flex-col h-full hover:shadow-xl hover:shadow-rose-500/10 transition-all border border-slate-100 bg-white"
                >
                  <div className="h-48 rounded-xl bg-slate-100 mb-4 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <DishImage
                      dishName={item.title?.en || item.title}
                      imageUrl={item.image}
                      alt={item.title?.[i18n.language?.split('-')[0]] || item.title?.en || item.title}
                      className="absolute inset-0 z-0 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 z-20">
                      <Badge variant="rose" className="backdrop-blur-md bg-white/90 shadow-sm border-none font-bold text-rose-600">
                        #{i + 1}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full shadow-sm">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <span className="text-xs font-bold text-slate-800">{item.rating ?? "4.8"}</span>
                    </div>
                  </div>

                  <div className="flex-1 px-2 pb-2">
                    <h4 className="font-bold text-slate-900 mb-1 text-lg leading-tight group-hover:text-rose-600 transition-colors">
                      {item.title?.[i18n.language?.split('-')[0]] || item.title?.en || item.title}
                    </h4>
                    <p className="text-sm text-slate-500 line-clamp-2">{item.description?.[i18n.language?.split('-')[0]] || item.description?.en || item.description}</p>
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        )}

        <FadeIn delay={0.4} className="mt-12 text-center">
          <button className="px-8 py-3 rounded-full border-2 border-slate-200 text-slate-700 font-medium hover:border-rose-500 hover:text-rose-600 transition-colors" onClick={() => navigate('/recipes') }>
            {t('trending.viewAll')}
          </button>
        </FadeIn>
      </div>
    </section>
  );
};
