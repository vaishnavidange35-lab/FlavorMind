import React, { useState } from "react";
import { Bell, Search } from "lucide-react";
import { Input } from "../ui/Input.jsx";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      // Navigate to recipes page with search query
      navigate("/recipes", { state: { globalSearch: searchTerm.trim() } });
      setSearchTerm("");
    }
  };

  return (
    <header className="h-16 border-b border-slate-100 bg-cream-50/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
      {/* Global Search */}
      <div className="w-96">
        <Input
          icon={Search}
          placeholder="Search ingredients, recipes, or flavor profiles..."
          className="bg-white/50 border-transparent focus:bg-white focus:border-emerald-500/30"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {/* Right Side Actions */}{" "}
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:text-slate-200 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-neon rounded-full"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-violet-500 to-accent p-[2px] cursor-pointer hover:shadow-glow-violet transition-shadow">
          <div className="h-full w-full rounded-full bg-cream-50 border border-transparent overflow-hidden">
            <img
              src="https://i.pravatar.cc/100?img=3"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
