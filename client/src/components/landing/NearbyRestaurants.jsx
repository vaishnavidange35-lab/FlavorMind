import React from "react";
import { FadeIn } from "../ui/FadeIn.jsx";
import { GlassCard } from "../ui/GlassCard.jsx";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "../ui/Button.jsx";
export const NearbyRestaurants = () => {
  return (
    <section id="restaurants" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
              {" "}
              Taste the synergy locally.{" "}
            </h2>
            <p className="text-lg text-slate-500 mb-8">
              {" "}
              We've mapped the menus of top restaurants near you. Enter a flavor
              profile and we'll tell you exactly which dish to order and where
              to find it.{" "}
            </p>
            <Button
              variant="secondary"
              className="gap-2"
              onClick={() => (window.location.href = "/restaurants")}
            >
              <Navigation size={18} /> Locate Restaurants{" "}
            </Button>
          </FadeIn>
          <FadeIn direction="left" className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-emerald-500/20 blur-3xl rounded-full"></div>
            <GlassCard className="p-6 relative">
              <div className="h-64 rounded-xl bg-cream-50 border border-slate-100 relative overflow-hidden flex items-center justify-center">
                <MapPin size={48} className="text-slate-500 opacity-50" />{" "}
                {/* Mock Map UI Elements */}{" "}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full shadow-glow-emerald animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-violet-500 rounded-full shadow-glow-violet"></div>
              </div>
              <div className="mt-6 flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-slate-200">
                <div className="w-12 h-12 rounded-full bg-cream-50 flex items-center justify-center text-primary font-bold">
                  96%
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">
                    The Artisan Kitchen
                  </h4>
                  <p className="text-sm text-slate-500">
                    Match: Wood-fired Citrus Salmon
                  </p>
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
