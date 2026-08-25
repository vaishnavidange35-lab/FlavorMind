import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard.jsx";
import { cn } from "../../utils/cn.js";
/** * Returns a color class based on the synergy score (0-100) */ const getSynergyColor =
  (score) => {
    if (score >= 90) return "bg-primary/80 text-slate-900 shadow-glow-emerald";
    if (score >= 75) return "bg-primary/40 text-emerald-100";
    if (score >= 50) return "bg-white text-slate-600";
    if (score >= 30) return "bg-amber-500/30 text-amber-200";
    return "bg-rose-500/30 text-rose-200";
    // Contrast / Clash
  };
export const SynergyMatrix = ({ ingredients = [], matrix = [] }) => {
  if (!ingredients.length || !matrix.length) {
    return (
      <GlassCard className="p-8 flex items-center justify-center text-slate-500 h-full">
        {" "}
        Add ingredients to view synergy matrix.{" "}
      </GlassCard>
    );
  }
  return (
    <GlassCard className="p-6 h-full w-full overflow-x-auto custom-scrollbar">
      <h3 className="text-lg font-display font-semibold mb-6 text-slate-900">
        Ingredient Synergy Matrix
      </h3>
      <div className="min-w-max">
        {" "}
        {/* Header Row */}{" "}
        <div className="flex mb-2">
          <div className="w-32 flex-shrink-0"></div>{" "}
          {/* Empty top-left corner */}{" "}
          {ingredients.map((ing, i) => (
            <div
              key={`header-${i}`}
              className="w-16 flex-shrink-0 flex items-end justify-center pb-2"
            >
              <span className="text-xs font-medium text-slate-500 rotate-[-45deg] origin-bottom-left truncate max-w-[80px]">
                {" "}
                {ing.name}{" "}
              </span>
            </div>
          ))}{" "}
        </div>{" "}
        {/* Matrix Rows */}{" "}
        <div className="space-y-1">
          {" "}
          {matrix.map((row, i) => (
            <div key={`row-${i}`} className="flex items-center">
              {" "}
              {/* Row Label */}{" "}
              <div className="w-32 flex-shrink-0 text-xs font-medium text-slate-600 truncate pr-4 text-right">
                {" "}
                {ingredients[i].name}{" "}
              </div>{" "}
              {/* Score Cells */}{" "}
              <div className="flex gap-1">
                {" "}
                {row.map((score, j) => (
                  <motion.div
                    key={`cell-${i}-${j}`}
                    whileHover={{ scale: 1.15, zIndex: 10 }}
                    className={cn(
                      "w-16 h-10 rounded-md flex items-center justify-center text-xs font-bold cursor-pointer transition-colors duration-300",
                      i === j
                        ? "bg-cream-50/50 text-slate-600"
                        : getSynergyColor(score),
                    )}
                    title={`${ingredients[i].name} + ${ingredients[j].name}: ${score}% Synergy`}
                  >
                    {" "}
                    {i === j ? "-" : `${score}%`}{" "}
                  </motion.div>
                ))}{" "}
              </div>
            </div>
          ))}{" "}
        </div>
      </div>
    </GlassCard>
  );
};
