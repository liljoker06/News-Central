import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { NewsPage } from "./pages/NewsPage";
import { HistoryPage } from "./pages/HistoryPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navbar } from "./components/Navbar";
import PopularityPage from "./pages/PopularityPage";
import HomepagePage from "./pages/HomePage";
import { useAuthStore } from "./store/authStore"; 

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
      {/* Affiche la Navbar seulement si l'utilisateur est connecté */}
      {isAuthenticated && <Navbar />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Pages protégées */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomepagePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/news"
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
