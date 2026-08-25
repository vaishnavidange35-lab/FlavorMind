import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar.jsx";
import { Navbar } from "./Navbar.jsx";
export const AppLayout = () => {
  return (
    <div className="flex h-screen bg-cream-50 overflow-hidden text-slate-900 font-sans selection:bg-primary selection:text-obsidian-900">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-64 transition-all duration-300">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
