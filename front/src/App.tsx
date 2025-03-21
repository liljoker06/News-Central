import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { NewsPage } from './pages/NewsPage';
import { HistoryPage } from './pages/HistoryPage';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Header } from "./components/Header"
import PopularityPage from './pages/PopularityPage';
import HomepagePage from './pages/HomePage';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Pages protégées */}
        <Route
          path="/"
          element={

              <NewsPage />
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
        <Route path="history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
