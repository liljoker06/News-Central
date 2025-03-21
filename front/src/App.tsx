import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { NewsPage } from "./pages/NewsPage";
import { HistoryPage } from "./pages/HistoryPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Header } from "./components/Header";
import PopularityPage from "./pages/PopularityPage";
import HomepagePage from "./pages/HomePage";
import { useAuthStore } from "./store/authStore"; // Importer le store Zustand

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
      {/* Affiche la Navbar seulement si l'utilisateur est connecté */}
      {isAuthenticated && <Header />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Pages protégées */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <NewsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/popularite"
          element={
            <ProtectedRoute>
              <PopularityPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomepagePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />

        {/* Redirection pour les routes inconnues */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
