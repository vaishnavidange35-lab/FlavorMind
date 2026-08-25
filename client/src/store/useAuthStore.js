import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setAuth: (user, token) => {
    if (token) localStorage.setItem("flavormind_jwt_token", token);
    set({ user, isAuthenticated: true, isLoading: false });
  },
  logout: () => {
    localStorage.removeItem("flavormind_jwt_token");
    set({ user: null, isAuthenticated: false, isLoading: false });
  },
  setLoading: (isLoading) => set({ isLoading }),
}));
