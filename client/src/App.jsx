import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppLayout } from "./components/layout/AppLayout.jsx";

// Pages
import { LandingPage } from "./pages/LandingPage.jsx";
import { DashboardPage } from "./pages/DashboardPage.jsx";
import { RecipesPage } from "./pages/RecipesPage.jsx";
import { FlavorMapPage } from "./pages/FlavorMapPage.jsx";
import { RecipeDetailsPage } from "./pages/RecipeDetailsPage.jsx";
import { KitchenInventoryPage } from "./pages/KitchenInventoryPage.jsx";
import { RestaurantFinderPage } from "./pages/RestaurantFinderPage.jsx";
import { RestaurantDetailsPage } from "./pages/RestaurantDetailsPage.jsx";
import { FavoritesPage } from "./pages/FavoritesPage.jsx";
import { SettingsPage } from "./pages/SettingsPage.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

const queryClient = new QueryClient();

function App() {
  const initTheme = useThemeStore((state) => state.initTheme);

  React.useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* App Routes with Sidebar/Navbar */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/flavor-map" element={<FlavorMapPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
            <Route path="/inventory" element={<KitchenInventoryPage />} />
            <Route path="/restaurants" element={<RestaurantFinderPage />} />
            <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
