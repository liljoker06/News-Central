import { Newspaper } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleHistoryClick = () => {
    navigate("/history");
  };

  const handleMenuClick = () => {
    navigate("/menu");
  }

    return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Newspaper className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">News Central</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{user?.email}</span>
            <button
              onClick={handleMenuClick}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
                Menu
            </button>
            <button
              onClick={handleHistoryClick}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Historique
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
