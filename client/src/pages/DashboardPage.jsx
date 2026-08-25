import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Activity } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Badge } from "../components/ui/Badge.jsx";
import { Input } from "../components/ui/Input.jsx";
import { flavorApi } from "../services/api.js";
import { useFlavorStore } from "../store/useFlavorStore.js";
import { useNavigate } from "react-router-dom";
export const DashboardPage = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const addIngredient = useFlavorStore((state) => state.addIngredient);
  const clearIngredients = useFlavorStore((state) => state.clearIngredients);
  const navigate = useNavigate();
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await flavorApi.processAiPrompt(prompt);
      const ingredients =
        res.data.data.mappedIngredients ||
        res.data.data.topMatchedIngredients ||
        [];
      ingredients.forEach((ing) => addIngredient(ing));
      // Navigate to the flavor map to show the result
      navigate("/flavor-map");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {" "}
      {/* Hero Section */}{" "}
      <section className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge variant="violet" className="mb-4">
            <Sparkles size={12} className="mr-1.5" /> AI Flavor Engine
            Active{" "}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-slate-900 mb-4">
            {" "}
            What are you <span className="text-gradient-emerald">
              craving
            </span>{" "}
            today?{" "}
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            {" "}
            Describe your ideal flavor profile, or list ingredients you have.
            The AI will deconstruct the compounds and map the perfect
            synergy.{" "}
          </p>
        </motion.div>{" "}
        {/* ChatGPT Style Prompt Box */}{" "}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative max-w-3xl"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-secondary/20 to-amber-500/20 rounded-2xl blur-lg opacity-70"></div>
          <div className="relative bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl p-2 flex items-center shadow-glass-dark">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. 'I want a rich, creamy paneer dish with smoky cardamom depth...'"
              className="border-none bg-transparent text-lg py-3 focus:ring-0"
            />
            <Button
              size="sm"
              className="ml-2 rounded-xl px-4 py-2.5 flex items-center gap-2"
              onClick={handleGenerate}
              disabled={loading}
            >
              {" "}
              {loading ? "Thinking..." : "Generate"} <ArrowRight size={16} />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 px-2">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mr-2 self-center">
              Try:
            </span>
            <Badge
              variant="default"
              className="cursor-pointer hover:bg-white/10 transition-colors"
            >
              Smoky Ghee & Garlic
            </Badge>
            <Badge
              variant="default"
              className="cursor-pointer hover:bg-white/10 transition-colors"
            >
              Tangy Tamarind Seafood
            </Badge>
            <Badge
              variant="default"
              className="cursor-pointer hover:bg-white/10 transition-colors"
            >
              Spicy Vegan Street Food
            </Badge>
          </div>
        </motion.div>
      </section>{" "}
      {/* Discovery Grid */}{" "}
      <section className="space-y-6 pt-8 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-semibold flex items-center gap-2">
            <Activity className="text-primary" /> Trending Synergies{" "}
          </h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {" "}
          {/* Mock Card 1 */}{" "}
          <GlassCard interactive className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">Paneer & Ghee</h3>
                <p className="text-sm text-slate-500">Deep Savory Richness</p>
              </div>
              <Badge variant="emerald">98% Match</Badge>
            </div>
            <div className="pt-4 border-t border-slate-200 flex gap-2">
              <Badge variant="default">Lactones</Badge>
              <Badge variant="default">Butyric Acid</Badge>
            </div>
          </GlassCard>{" "}
          {/* Mock Card 2 */}{" "}
          <GlassCard interactive className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">
                  Tamarind & Mustard Seeds
                </h3>
                <p className="text-sm text-slate-500">Tangy Nutty Pop</p>
              </div>
              <Badge variant="emerald">94% Match</Badge>
            </div>
            <div className="pt-4 border-t border-slate-200 flex gap-2">
              <Badge variant="default">Tartaric Acid</Badge>
              <Badge variant="default">Allyl isothiocyanate</Badge>
            </div>
          </GlassCard>{" "}
          {/* Mock Card 3 */}{" "}
          <GlassCard interactive className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">
                  Black Cardamom & Mutton
                </h3>
                <p className="text-sm text-slate-500">Smoky Umami Depth</p>
              </div>
              <Badge variant="emerald">91% Match</Badge>
            </div>
            <div className="pt-4 border-t border-slate-200 flex gap-2">
              <Badge variant="default">Cineole</Badge>
              <Badge variant="default">Glutamate</Badge>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};
