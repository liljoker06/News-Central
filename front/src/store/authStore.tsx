import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as apiLogin, AuthResponse } from "../api/auth";

interface User {
  id: string;
  username: string;  // 🔹 Ajout de `username`
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      checkAuth: () => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (token && userData) {
          set({
            user: JSON.parse(userData),
            isAuthenticated: true,
          });
        }
      },

      login: async (email: string, password: string) => {
        try {
          const data: AuthResponse = await apiLogin(email, password);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));  // 🔹 Stocker `username` et `email`

          set({
            user: data.user,
            isAuthenticated: true,
          });

          console.log("✅ Connexion réussie :", data.user);
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message || "Erreur de connexion");
          } else {
            throw new Error("Erreur de connexion");
          }
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        set({ user: null, isAuthenticated: false });

        console.log("🚪 Déconnexion réussie");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
