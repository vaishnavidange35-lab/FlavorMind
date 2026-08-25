import React, { useState } from "react";
import { FadeIn } from "../components/ui/FadeIn.jsx";
import { GlassCard } from "../components/ui/GlassCard.jsx";
import { Input } from "../components/ui/Input.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Badge } from "../components/ui/Badge.jsx";
import { Search, Plus, Trash2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
export const KitchenInventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState([
    "Paneer",
    "Ghee",
    "Garam Masala",
    "Basmati Rice",
    "Tomatoes",
    "Onions",
  ]);
  const navigate = useNavigate();
  const handleAdd = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && !inventory.includes(searchTerm.trim())) {
      setInventory([...inventory, searchTerm.trim()]);
      setSearchTerm("");
    }
  };
  const removeIng = (item) => {
    setInventory(inventory.filter((i) => i !== item));
  };
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <FadeIn>
        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-2">
          My Kitchen Inventory
        </h1>
        <p className="text-slate-500">
          Add the ingredients you currently have. We'll use AI to generate
          recipes based exactly on your pantry.
        </p>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {" "}
        {/* Left Col: Add & Generate */}{" "}
        <div className="md:col-span-1 space-y-6">
          <GlassCard className="p-6">
            <h3 className="font-semibold text-lg mb-4">Add Ingredients</h3>
            <form onSubmit={handleAdd} className="flex gap-2">
              <Input
                placeholder="e.g. Tomatoes"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
              />
              <Button type="submit" variant="secondary" className="px-3">
                <Plus size={18} />
              </Button>
            </form>
          </GlassCard>
          <GlassCard className="p-6 border-emerald-500/30 bg-primary/5 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-2xl rounded-full"></div>
            <h3 className="font-semibold text-lg mb-2 relative z-10 text-primary">
              AI Recipe Generator
            </h3>
            <p className="text-sm text-slate-500 mb-6 relative z-10">
              We found 12 possible synergistic combinations using your current
              inventory.
            </p>
            <Button
              variant="primary"
              className="w-full gap-2 relative z-10"
              onClick={() =>
                navigate("/recipes", {
                  state: { inventory, autoGenerate: true },
                })
              }
            >
              <Sparkles size={16} /> Generate Now{" "}
            </Button>
          </GlassCard>
        </div>{" "}
        {/* Right Col: Current Inventory */}{" "}
        <div className="md:col-span-2">
          <GlassCard className="p-6 min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">
                In Stock ({inventory.length})
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setInventory([])}
                className="text-rose-400 hover:text-rose-300"
              >
                Clear All
              </Button>
            </div>{" "}
            {inventory.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-slate-500 border border-dashed border-slate-200 rounded-xl">
                {" "}
                Your pantry is empty.{" "}
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {" "}
                {inventory.map((item) => (
                  <FadeIn key={item} delay={0.05}>
                    <Badge
                      variant="default"
                      className="pl-4 pr-2 py-2 text-sm flex items-center gap-3 bg-cream-50"
                    >
                      {" "}
                      {item}{" "}
                      <button
                        onClick={() => removeIng(item)}
                        className="text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </Badge>
                  </FadeIn>
                ))}{" "}
              </div>
            )}{" "}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
