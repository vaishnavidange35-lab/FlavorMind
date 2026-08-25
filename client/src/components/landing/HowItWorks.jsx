import React from "react";
import { FadeIn } from "../ui/FadeIn.jsx";
import { GlassCard } from "../ui/GlassCard.jsx";
import { Network, Microscope, Utensils } from "lucide-react";
export const HowItWorks = () => {
  const steps = [
    {
      icon: Network,
      title: "Vector Embedding",
      description:
        "Every ingredient is analyzed for its chemical compounds and mapped into a 64-dimensional vector space.",
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      icon: Microscope,
      title: "Synergy Math",
      description:
        "Cosine similarity formulas calculate the exact mathematical synergy and contrasting balance between ingredients.",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Utensils,
      title: "Culinary Inference",
      description:
        "Our rule-based engine applies expert culinary techniques, adjusting for cooking methods like roasting or blooming.",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];
  return (
    <section id="how-it-works" className="py-24 bg-white/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            {" "}
            The science of flavor.{" "}
          </h2>
          <p className="text-lg text-slate-500">
            {" "}
            FlavorMind AI doesn't just search databases. It mathematically
            computes the aromatic overlap between ingredients at a molecular
            level.{" "}
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {" "}
          {steps.map((step, idx) => (
            <FadeIn key={idx} delay={0.2 + idx * 0.1} direction="up">
              <GlassCard className="p-8 h-full flex flex-col items-center text-center hover:border-white/20 transition-colors">
                <div
                  className={`w-16 h-16 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center mb-6`}
                >
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </GlassCard>
            </FadeIn>
          ))}{" "}
        </div>
      </div>
    </section>
  );
};
