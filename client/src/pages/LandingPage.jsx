import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { LandingNavbar } from "../components/landing/LandingNavbar.jsx";
import { Hero } from "../components/landing/Hero.jsx";
import { FeaturedRecipes } from "../components/landing/FeaturedRecipes.jsx";
import { TrendingRecipes } from "../components/landing/TrendingRecipes.jsx";
import { NearbyRestaurants } from "../components/landing/NearbyRestaurants.jsx";
import { FAQ } from "../components/landing/FAQ.jsx";
import { Footer } from "../components/landing/Footer.jsx";

export const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <div className="bg-cream-50 min-h-screen text-slate-900 font-sans selection:bg-primary selection:text-slate-900 overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent origin-left z-50"
        style={{ scaleX }}
      />
      <LandingNavbar />
      <main>
        <Hero />
        <FeaturedRecipes />
        <TrendingRecipes />
        <NearbyRestaurants />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};
