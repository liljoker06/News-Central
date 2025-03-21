import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { NewsPage } from './pages/NewsPage';
import { HistoryPage } from './pages/HistoryPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Header } from "./components/Header"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={

              <NewsPage />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;