import React, { useState } from "react";
import { FadeIn } from "../ui/FadeIn.jsx";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How does FlavorMind AI work?",
    a: "FlavorMind AI leverages natural language processing and chemical flavor profiling to understand the Indian dishes you search for. It maps ingredients mathematically to generate highly authentic recipes and recommend perfectly balanced substitutions based on regional culinary rules.",
  },
  {
    q: "How are ingredient substitutes selected?",
    a: "Our engine uses a 64-dimensional vector space mapping over 200+ flavor compounds (like Eugenol in clove or Curcumin in turmeric). When suggesting a substitute, the AI calculates the cosine similarity to find ingredients that serve the same structural and aromatic purpose in the dish.",
  },
  {
    q: "How is the Authenticity Score calculated?",
    a: "The score is determined by cross-referencing your recipe's ingredient ratios and cooking techniques against our database of regional Indian culinary constraints, trained on expert chef methodologies.",
  },
  {
    q: "How does restaurant ranking work?",
    a: "We analyze thousands of verified reviews and use Google Maps data to rank restaurants based on proximity, historical ratings, and specific mentions of authentic regional flavor profiles for the exact dish you are searching.",
  },
  {
    q: "Can I search by ingredients?",
    a: "Absolutely. You can type in exactly what's in your pantry (e.g., 'Paneer, tomatoes, ginger, cardamom') and the AI will recommend the best authentic Indian dish you can cook immediately.",
  },
  {
    q: "Can I search by city?",
    a: "Yes! If you search for a city like 'Mumbai' or 'Delhi', we will transition into Restaurant Discovery mode and show you the highest-rated authentic Indian restaurants in that location.",
  },
  {
    q: "How does AI recommend recipes?",
    a: "Recommendations are dynamically generated based on your past searches, currently trending dishes across India, and seasonal ingredient availability mapped to traditional recipes.",
  },
  {
    q: "Can I save favourite recipes?",
    a: "Yes. By creating an account, you can bookmark any recipe or restaurant to your personalized 'Favorites' tab for quick access later.",
  },
  {
    q: "Can I compare restaurants?",
    a: "While viewing a recipe, our Google Maps integration displays a list of the top 25+ nearby restaurants serving that specific dish, allowing you to instantly compare prices, ratings, and distance.",
  },
  {
    q: "Can I generate food images?",
    a: "Our integration with advanced AI diffusion models allows you to instantly visualize any dish or ingredient combination before you start cooking.",
  }
];

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);
  
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-500">
            Everything you need to know about the FlavorMind platform.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 gap-4">
          {faqs.map((faq, idx) => (
            <FadeIn key={idx} delay={0.05 * idx}>
              <div className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${openIdx === idx ? 'bg-primary/5 border-primary/20' : 'bg-slate-50 border-slate-200 hover:border-primary/30'}`}>
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left text-slate-900 focus:outline-none"
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                >
                  <span className="font-semibold text-lg">{faq.q}</span>
                  <motion.div animate={{ rotate: openIdx === idx ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                    <ChevronDown size={20} className={openIdx === idx ? "text-primary" : "text-slate-400"} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-6 pb-5 text-slate-600 text-lg leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
