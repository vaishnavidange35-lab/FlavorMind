import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FadeIn } from "../ui/FadeIn.jsx";
import { Badge } from "../ui/Badge.jsx";
import { Clock, Flame, Navigation, Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { recipeApi } from "../../services/api.js";
import { useTranslation } from "react-i18next";
import { DishImage } from "../common/DishImage.jsx";

const STATES = [
  "Maharashtra",
  "Punjab",
  "Kerala",
  "Tamil Nadu",
  "Gujarat",
  "Rajasthan",
  "West Bengal",
  "Delhi",
  "Hyderabad",
  "Kashmir",
  "Goa",
  "Assam",
  "Odisha",
  "Karnataka",
];

export const FeaturedRecipes = () => {
  const [activeState, setActiveState] = useState("Maharashtra");
  const [limit, setLimit] = useState(6);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["homepageRecipes", activeState, limit], 
    queryFn: () => recipeApi.explore(activeState, limit, 0).then((res) => res.data.data), 
  });

  const activeRecipes = data?.recipes || [];
  const totalAvailable = data?.total || 0;
  const hasMore = limit < totalAvailable;

  const handleStateChange = (state) => {
    setActiveState(state);
    setLimit(6);
  };

  return (
    <section id="explore" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-4">
              {t('featured.title')}
            </h2>
          </div>
          <button onClick={() => navigate('/recipes', { state: { globalSearch: activeState } })} className="text-primary font-medium hover:text-emerald-700 transition-colors flex items-center gap-2 whitespace-nowrap">
            {t('featured.viewFull')} <Navigation size={16} />
          </button>
        </FadeIn>

        <FadeIn delay={0.2} className="flex flex-wrap overflow-x-auto pb-4 mb-8 hide-scrollbar gap-2">
          {STATES.map((state) => (
            <button
              key={state}
              onClick={() => handleStateChange(state)}
              className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                activeState === state
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {state}
            </button>
          ))}
        </FadeIn>

        {isLoading && limit === 6 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="h-96 rounded-3xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : activeRecipes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeRecipes.map((dish) => (
                <FadeIn key={dish.id} delay={0.1}>
                  <div
                    onClick={() => navigate(`/recipe/${dish.id}`)}
                    className="group cursor-pointer flex flex-col gap-4"
                  >
                    <div className="relative h-72 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500">
                      <DishImage
                        dishName={dish.title?.en || dish.title}
                        imageUrl={dish.image}
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 z-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge variant={dish.isVeg ? 'emerald' : 'rose'} className="backdrop-blur-md bg-white/90 shadow-sm border-none font-bold">
                          {dish.isVeg ? t('featured.veg') : t('featured.nonVeg')}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        <span className="text-xs font-bold text-slate-800">{Number(dish.rating || 4.8).toFixed(1)}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-primary transition-colors">
                        {dish.title?.[i18n.language?.split('-')[0]] || dish.title?.en || dish.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-3 text-sm text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5"><MapPin size={16} className="text-slate-400" /> {activeState}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="flex items-center gap-1.5"><Clock size={16} className="text-slate-400" /> {dish.total_time || (dish.prep_time + dish.cook_time)}m</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="flex items-center gap-1.5"><Flame size={16} className="text-orange-400" /> {dish.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setLimit(prev => prev + 6)}
                  className="px-8 py-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-full transition-colors border border-slate-200 flex items-center gap-2"
                >
                  {isLoading ? t('featured.loading') : t('featured.viewMore')}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center text-slate-500 shadow-sm">
            <p className="text-lg font-semibold">{t('featured.comingSoon', { state: activeState })}</p>
            <p className="mt-3">{t('featured.exploreOther')}</p>
          </div>
        )}
      </div>
    </section>
  );
};
