import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, ChefHat, Sparkles, Mic, Wand2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FadeIn } from "../ui/FadeIn.jsx";
import { useTranslation } from "react-i18next";

const PLACEHOLDERS = [
  "I want something healthy but tasty...",
  "I want spicy Indian food...",
  "I feel like eating street food...",
  "I want something sweet...",
  "I want high-protein food...",
  "I want something light for dinner...",
  "I want South Indian breakfast...",
  "I have only paneer and tomato at home...",
  "I want food under ₹300...",
  "I'm craving something cheesy..."
];

const QUICK_CHIPS = [
  "Healthy Food", "Spicy Food", "Sweet Dishes", "Street Food", "High Protein", 
  "Dinner Ideas", "Breakfast", "Quick Meals", "Budget Meals", "Festival Specials"
];

const SEARCH_SUGGESTIONS = [
  "Healthy but tasty",
  "Masaledar food",
  "Homestyle food",
  "Restaurant style",
  "High protein gym diet",
  "Diabetic friendly",
  "Comfort food for rain"
];

export const Hero = () => {
  const [placeholderText, setPlaceholderText] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // We try to get translated placeholders, fallback to English PLACEHOLDERS
    let currentPls = t('hero.placeholders', { returnObjects: true });
    if (!Array.isArray(currentPls)) currentPls = PLACEHOLDERS;
    
    const currentFullText = currentPls[placeholderIdx] || PLACEHOLDERS[placeholderIdx];
    
    if (isTyping) {
      if (placeholderText.length < currentFullText.length) {
        const timeout = setTimeout(() => {
          setPlaceholderText(currentFullText.slice(0, placeholderText.length + 1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (placeholderText.length > 0) {
        const timeout = setTimeout(() => {
          setPlaceholderText(currentFullText.slice(0, placeholderText.length - 1));
        }, 20);
        return () => clearTimeout(timeout);
      } else {
        setPlaceholderIdx((prev) => (prev + 1) % PLACEHOLDERS.length);
        setIsTyping(true);
      }
    }
  }, [placeholderText, isTyping, placeholderIdx, t, i18n.language]);

  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) return SEARCH_SUGGESTIONS.slice(0, 6);
    const query = searchTerm.toLowerCase();
    return SEARCH_SUGGESTIONS.filter((item) => item.toLowerCase().includes(query)).slice(0, 6);
  }, [searchTerm]);

  const handleSearch = (term) => {
    const query = term.trim();
    if (!query) return;
    navigate("/recipes", { state: { globalSearch: query } });
    setSearchTerm("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch(searchTerm);
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white">
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[760px] h-[360px] bg-emerald-300/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-emerald-200 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur">
            <Sparkles size={16} className="text-emerald-500 animate-pulse" />
            {t('hero.badge')}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-slate-900 max-w-4xl leading-[1.05]">
            {t('hero.title1')} <br className="hidden md:block"/> {t('hero.title2')}
          </h1>
        </FadeIn>



        <FadeIn delay={0.4}>
          <div className="relative mt-10 w-full max-w-3xl mx-auto">
            <div className="text-xl font-medium mb-4 text-emerald-800/80 flex items-center justify-center gap-2">
              <Wand2 size={20} className="text-emerald-500" />
              {t('hero.cravingPrompt', '💬 Aaj aapka kaisa khana khane ka mann hai?')}
            </div>
            <div className={`relative flex items-center bg-white rounded-[2rem] border transition-all duration-300 shadow-2xl ${isFocused ? 'border-primary shadow-primary/30 ring-4 ring-primary/10' : 'border-slate-200 hover:border-primary/50'}`}>
              <div className="px-5 py-4 text-primary animate-pulse">
                <Sparkles size={24} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder={placeholderText}
                className="flex-1 bg-transparent border-none outline-none py-5 px-1 text-lg md:text-xl text-slate-900 placeholder:text-slate-400 font-medium"
              />
              <button
                className="px-4 py-4 text-slate-400 hover:text-primary transition-colors"
                title="Voice Search"
              >
                <Mic size={24} />
              </button>
              <button
                onClick={() => handleSearch(searchTerm)}
                className="hidden sm:inline-flex m-2 items-center justify-center rounded-full bg-primary px-8 py-3 text-white text-base font-semibold tracking-tight shadow-lg shadow-primary/20 hover:bg-emerald-600 transition-colors"
              >
                {t('hero.searchBtn', 'Search')}
              </button>
            </div>

            {isFocused && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-x-0 top-full mt-3 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden z-50"
              >
                <div className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 bg-slate-50/50">
                  AI Suggestions
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
                  {suggestions.map((item) => (
                    <button
                      key={item}
                      onMouseDown={() => handleSearch(item)}
                      className="rounded-2xl bg-white border border-slate-100 px-4 py-3 text-left text-slate-700 transition hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 flex items-center gap-3"
                    >
                      <Search size={16} className="text-emerald-400" />
                      <div className="font-semibold">{item}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </FadeIn>


        <FadeIn delay={0.6} className="mt-10 text-center">
          <div className="inline-flex flex-wrap items-center gap-3 justify-center text-sm text-slate-500 max-w-4xl">
            {QUICK_CHIPS.map((term) => (
              <button key={term} onClick={() => handleSearch(term)} className="rounded-full bg-white border border-slate-200 px-4 py-2 text-slate-700 hover:bg-primary hover:text-white hover:border-primary shadow-sm transition-all duration-300">
                {term}
              </button>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
