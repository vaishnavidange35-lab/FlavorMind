import { create } from "zustand";

// Check initial theme from localStorage or system preference
const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("flavormind_theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "dark"; // Default fallback
};

export const useThemeStore = create((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("flavormind_theme", newTheme);

      // Update DOM class immediately
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return { theme: newTheme };
    }),
  initTheme: () =>
    set((state) => {
      if (state.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return {};
    }),
}));
