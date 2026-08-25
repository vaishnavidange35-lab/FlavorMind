import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Beaker, Menu, X } from "lucide-react";
import { Button } from "../ui/Button.jsx";
import { cn } from "../../utils/cn.js";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "../../store/useThemeStore.js";
import { Sun, Moon } from "lucide-react";
import { LanguageSelector } from "../ui/LanguageSelector.jsx";
import { useTranslation } from "react-i18next";
export const LandingNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const { t } = useTranslation();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-slate-200 py-3"
            : "bg-transparent py-6",
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {" "}
          {/* Logo */}{" "}
          <div className="flex items-center gap-2 text-primary font-display font-bold text-2xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-slate-900">
              <Beaker size={18} strokeWidth={2.5} />
            </div>{" "}
            FlavorMind{" "}
          </div>{" "}
          {/* Desktop Nav */}{" "}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t('nav.howItWorks')}
            </a>
            <a
              href="#explore"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t('nav.explore')}
            </a>
            <a
              href="#top-dishes"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t('nav.topDishes')}
            </a>
            <a
              href="#restaurants"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t('nav.restaurants')}
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t('nav.faq')}
            </a>
          </nav>{" "}
          {/* Actions */}{" "}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector />
            <button
              onClick={toggleTheme}
              className="text-slate-500 hover:text-slate-900 transition-colors"
            >
              {" "}
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}{" "}
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => (window.location.href = "/dashboard")}
            >
              {t('nav.enterKitchen')}
            </Button>
          </div>{" "}
          {/* Mobile Toggle */}{" "}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSelector />
            <button onClick={toggleTheme} className="text-slate-500 ">
              {" "}
              {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}{" "}
            </button>
            <button
              className="text-slate-600 "
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>{" "}
      {/* Mobile Menu */}{" "}
      <AnimatePresence>
        {" "}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-slate-50 flex flex-col p-6"
          >
            <div className="flex justify-end">
              <button
                className="text-slate-600 "
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col gap-6 mt-12 text-2xl font-display font-semibold text-center">
                <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-600 hover:text-slate-900"
              >
                {t('nav.howItWorks')}
              </a>
              <a
                href="#explore"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-600 hover:text-slate-900"
              >
                {t('nav.explore')}
              </a>
              <a
                href="#top-dishes"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-600 hover:text-slate-900"
              >
                {t('nav.topDishes')}
              </a>
              <a
                href="#restaurants"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-600 hover:text-slate-900"
              >
                {t('nav.restaurants')}
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-600 hover:text-slate-900"
              >
                {t('nav.faq')}
              </a>
              <div className="mt-8 flex flex-col gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  {t('nav.enterKitchen')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}{" "}
      </AnimatePresence>
    </>
  );
};
