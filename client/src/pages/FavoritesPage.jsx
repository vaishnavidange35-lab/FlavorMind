import React from "react";
import { FadeIn } from "../components/ui/FadeIn.jsx";
import { GlassCard } from "../components/ui/GlassCard.jsx";
import { Badge } from "../components/ui/Badge.jsx";
import { Heart, Clock, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DishImage } from "../components/common/DishImage.jsx";
export const FavoritesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <FadeIn>
        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-2">
          Saved Recipes
        </h1>
        <p className="text-slate-500">
          Your personal collection of flavor synergies.
        </p>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {" "}
        {[
          { id: '1', title: 'Butter Chicken', match: '98%', time: '40m' },
          { id: '2', title: 'Masala Dosa', match: '95%', time: '25m' },
          { id: '3', title: 'Hyderabadi Biryani', match: '92%', time: '50m' }
        ].map((item, i) => (
          <FadeIn key={i} delay={0.1 * i}>
            <GlassCard
              interactive
              className="group relative h-80 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/recipe/${item.id}`)}
            >
              <DishImage dishName={item.title} imageUrl={item.image} className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105 z-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/40 to-transparent"></div>
              <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md text-rose-500 shadow-glass-dark">
                <Heart fill="currentColor" size={20} />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                <Badge
                  variant="emerald"
                  className="self-start mb-3 backdrop-blur-md bg-primary/10 border-none"
                >
                  {item.match} Match
                </Badge>
                <h3 className="text-xl font-display font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} /> {item.time}
                  </span>
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        ))}{" "}
      </div>
    </div>
  );
};
