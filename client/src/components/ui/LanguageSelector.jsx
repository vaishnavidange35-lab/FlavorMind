import React, { useState, useEffect, useRef } from "react";
import { Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" }
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lngCode) => {
    i18n.changeLanguage(lngCode);
    setIsOpen(false);
  };

  const activeLang = LANGUAGES.find((l) => l.code === i18n.language?.split('-')[0]) || LANGUAGES[0];

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-slate-100 transition-colors text-slate-700 font-medium text-sm"
      >
        <Globe size={18} className="text-slate-500" />
        <span className="hidden md:inline">{activeLang.name}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
          >
            <div className="p-2 space-y-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm rounded-xl transition-colors ${
                    activeLang.code === lang.code
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">{lang.flag}</span>
                    {lang.name}
                  </span>
                  {activeLang.code === lang.code && <Check size={16} className="text-primary" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
