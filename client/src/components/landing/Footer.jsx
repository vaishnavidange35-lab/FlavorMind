import React from "react";
import { Sparkles, Mail, ArrowRight, Globe } from "lucide-react";
import { FadeIn } from "../ui/FadeIn.jsx";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-slate-900 font-display font-bold text-2xl mb-4">
              <Sparkles size={24} className="text-primary" /> FlavorMind AI
            </Link>
            <p className="text-slate-500 mb-8 max-w-sm">
              The world's most advanced AI-powered platform for discovering, exploring, and cooking authentic Indian cuisine.
            </p>
            
            <h4 className="text-slate-900 font-semibold mb-4">Subscribe to our Newsletter</h4>
            <div className="flex items-center gap-2 max-w-sm">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <button className="bg-slate-900 text-white p-2.5 rounded-full hover:bg-primary transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 font-semibold mb-6 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-500 font-medium">
              <li><Link to="/recipes" className="hover:text-primary transition-colors">AI Recipes</Link></li>
              <li><Link to="/restaurants" className="hover:text-primary transition-colors">Restaurants</Link></li>
              <li><Link to="/inventory" className="hover:text-primary transition-colors">My Pantry</Link></li>
              <li><Link to="/flavor-map" className="hover:text-primary transition-colors">Flavor Engine</Link></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Popular States */}
          <div>
            <h4 className="text-slate-900 font-semibold mb-6 uppercase tracking-wider text-xs">Indian States</h4>
            <ul className="space-y-3 text-sm text-slate-500 font-medium">
              <li><button className="hover:text-primary transition-colors">Punjab</button></li>
              <li><button className="hover:text-primary transition-colors">Maharashtra</button></li>
              <li><button className="hover:text-primary transition-colors">Kerala</button></li>
              <li><button className="hover:text-primary transition-colors">Tamil Nadu</button></li>
              <li><button className="hover:text-primary transition-colors">Gujarat</button></li>
            </ul>
          </div>

          {/* Popular Dishes */}
          <div>
            <h4 className="text-slate-900 font-semibold mb-6 uppercase tracking-wider text-xs">Popular Dishes</h4>
            <ul className="space-y-3 text-sm text-slate-500 font-medium">
              <li><Link to="/recipe/rec-9" className="hover:text-primary transition-colors">Butter Chicken</Link></li>
              <li><Link to="/recipe/rec-3" className="hover:text-primary transition-colors">Hyderabadi Biryani</Link></li>
              <li><Link to="/recipe/rec-4" className="hover:text-primary transition-colors">Masala Dosa</Link></li>
              <li><Link to="/recipe/rec-1" className="hover:text-primary transition-colors">Paneer Butter Masala</Link></li>
              <li><Link to="/recipe/rec-8" className="hover:text-primary transition-colors">Kerala Fish Curry</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><Globe size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors"><Mail size={20} /></a>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 font-medium">
            <a href="#" className="hover:text-slate-900 transition-colors">About Us</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
          </div>
          
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} FlavorMind AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
