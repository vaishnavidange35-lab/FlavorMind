import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Network, Plus, X } from "lucide-react";
import { flavorApi } from "../services/api.js";
import { useFlavorStore } from "../store/useFlavorStore.js";
import { FlavorRadarChart } from "../components/flavor/FlavorRadarChart.jsx";
import { GlassCard } from "../components/ui/GlassCard.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Badge } from "../components/ui/Badge.jsx";
export const FlavorMapPage = () => {
  const navigate = useNavigate();
  const { selectedIngredients, removeIngredient } = useFlavorStore();
  // Fetch flavor map data from backend
  const {
    data: mapData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["flavorMap", selectedIngredients.map((i) => i.id)],
    queryFn: async () => {
      if (selectedIngredients.length === 0) return null;
      const res = await flavorApi.mapFlavors(
        selectedIngredients.map((i) => i.id),
      );
      return res.data.data;
    },
    enabled: selectedIngredients.length > 0,
    staleTime: 5 * 60 * 1000,
    // 5 mins
  });
  // Prepare Radar Chart Data
  const radarData =
    mapData?.topFlavorNotes?.map((note) => ({
      subject: note.name,
      A: note.intensity,
      fullMark: 100,
    })) || [];
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {" "}
      {/* Header */}{" "}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-2 flex items-center gap-3">
            <Network className="text-violet-neon" size={32} /> Flavor
            Workspace{" "}
          </h1>
          <p className="text-slate-500 max-w-xl">
            {" "}
            Mix and match ingredients to explore authentic Indian flavor
            profiles and discover your perfect dish.{" "}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <Plus size={16} className="mr-1.5" /> Add Ingredient
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              navigate("/recipes", {
                state: { inventory: selectedIngredients.map((i) => i.name) },
              })
            }
          >
            Generate Recipe
          </Button>
        </div>
      </div>{" "}
      {/* Active Ingredients Palette */}{" "}
      <GlassCard className="p-4 flex flex-wrap gap-3 items-center">
        <span className="text-sm font-medium text-slate-500 mr-2">
          Active Palette:
        </span>{" "}
        {selectedIngredients.map((ing) => (
          <motion.div
            key={ing.id}
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Badge
              variant="default"
              className="pl-3 pr-1.5 py-1.5 flex items-center gap-2 bg-cream-50 border-slate-200 hover:border-emerald-500/50 transition-colors"
            >
              {" "}
              {ing.name}{" "}
              <button
                onClick={() => removeIngredient(ing.id)}
                className="w-5 h-5 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-500 hover:text-rose-400 transition-colors"
              >
                <X size={12} />
              </button>
            </Badge>
          </motion.div>
        ))}{" "}
        {selectedIngredients.length === 0 && (
          <span className="text-sm text-slate-500 italic">
            No ingredients selected.
          </span>
        )}{" "}
      </GlassCard>{" "}
      {/* Main Grid */}{" "}
      {selectedIngredients.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[500px]">
          {" "}
          {/* Radar Chart Panel */}{" "}
          <div className="lg:col-span-7 h-full relative">
            {" "}
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-cream-50/50 backdrop-blur-sm rounded-2xl">
                <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}{" "}
            <FlavorRadarChart data={radarData} name1="Composite Profile" />
          </div>{" "}
          {/* Flavor Summary Panel */}{" "}
          <div className="lg:col-span-5 h-full">
            <GlassCard className="h-full p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Network className="text-primary" size={24} />
                  <div>
                    <h2 className="text-2xl font-display font-semibold text-slate-900">
                      Flavor Summary
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Top tasting notes and ingredient balance from your
                      selected pantry.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {" "}
                  {mapData?.topFlavorNotes?.map((note) => (
                    <div
                      key={note.name}
                      className="rounded-3xl bg-slate-950/70 border border-slate-200 p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600 uppercase tracking-[0.18em]">
                          {note.name}
                        </span>
                        <span className="text-sm font-semibold text-primary">
                          {Math.round(note.intensity)}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-violet-500"
                          style={{ width: `${Math.min(100, note.intensity)}%` }}
                        />
                      </div>
                    </div>
                  ))}{" "}
                </div>
              </div>
              <div className="mt-4 rounded-3xl bg-primary/10 border border-emerald-300/10 p-5 text-slate-600">
                <p className="text-sm font-medium text-emerald-200">
                  Composite Score
                </p>
                <p className="text-4xl font-bold text-slate-900 mt-2">
                  {" "}
                  {mapData?.overallSynergyScore ?? "—"}%{" "}
                </p>
                <p className="text-sm text-slate-500 mt-3">
                  An indicator of how well the selected ingredients balance
                  across Indian flavor profiles.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      ) : (
        <div className="h-[400px] rounded-2xl border border-dashed border-slate-200 flex items-center justify-center text-slate-500 flex-col gap-4">
          <Network size={48} className="opacity-50" />
          <p>Add ingredients to your palette to begin mapping flavors.</p>
        </div>
      )}{" "}
    </div>
  );
};
