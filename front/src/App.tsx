import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { NewsPage } from './pages/NewsPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import PopularityPage from './pages/PopularityPage';
import HomepagePage from './pages/HomePage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page de connexion (accessible sans protection) */}
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
          path="/Home"
          element={
            <ProtectedRoute>
              <HomepagePage />
            </ProtectedRoute>
          }

        />
        
        

        {/* Redirection pour les routes inconnues */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
