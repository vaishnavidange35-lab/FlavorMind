import { create } from "zustand";

export const useFlavorStore = create((set) => ({
  selectedIngredients: [
    { id: "ing-1", name: "Paneer", category: "Dairy" },
    { id: "ing-3", name: "Ghee", category: "Oils & Fats" },
    { id: "ing-15", name: "Black Cardamom", category: "Spices" },
  ],
  addIngredient: (ingredient) =>
    set((state) => ({
      selectedIngredients: [...state.selectedIngredients, ingredient],
    })),
  removeIngredient: (id) =>
    set((state) => ({
      selectedIngredients: state.selectedIngredients.filter(
        (ing) => ing.id !== id,
      ),
    })),
  clearIngredients: () => set({ selectedIngredients: [] }),
}));
