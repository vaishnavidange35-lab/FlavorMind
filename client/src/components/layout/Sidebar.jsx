import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Compass,
  ChefHat,
  User,
  Settings,
  Beaker,
  Refrigerator,
  MapPin,
  Heart,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "../../utils/cn.js";
import { useThemeStore } from "../../store/useThemeStore.js";
const navItems = [
  { icon: Home, label: "Dashboard", to: "/dashboard" },
  { icon: ChefHat, label: "Recipes", to: "/recipes" },
  { icon: Refrigerator, label: "Inventory", to: "/inventory" },
  { icon: MapPin, label: "Restaurants", to: "/restaurants" },
  { icon: Heart, label: "Favorites", to: "/favorites" },
];
export const Sidebar = () => {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <aside className="w-64 h-screen bg-slate-50 border-r border-slate-200 flex flex-col fixed left-0 top-0 transition-colors duration-300">
      {" "}
      {/* Logo Area */}{" "}
      <div
        className="h-16 flex items-center px-6 border-b border-slate-200 cursor-pointer hover:bg-slate-100 :bg-white/5 transition-colors"
        onClick={() => (window.location.href = "/")}
      >
        <div className="flex items-center gap-2 text-emerald-600 font-display font-bold text-xl tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-slate-900">
            <Beaker size={18} strokeWidth={2.5} />
          </div>{" "}
          FlavorMind{" "}
        </div>
      </div>{" "}
      {/* Navigation */}{" "}
      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
          Workspace
        </div>{" "}
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-emerald-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 :text-slate-200 hover:bg-slate-100 :bg-white/5",
              )
            }
          >
            <item.icon size={18} /> {item.label}{" "}
          </NavLink>
        ))}{" "}
      </nav>{" "}
      {/* Bottom Area */}{" "}
      <div className="p-4 border-t border-slate-200 space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-900 :text-slate-200 hover:bg-slate-100 :bg-white/5 transition-colors"
        >
          {" "}
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}{" "}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}{" "}
        </button>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-emerald-700 "
                : "text-slate-500 hover:text-slate-900 :text-slate-200 hover:bg-slate-100 :bg-white/5",
            )
          }
        >
          <Settings size={18} /> Settings{" "}
        </NavLink>
      </div>
    </aside>
  );
};
