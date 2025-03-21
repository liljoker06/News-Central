import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as apiLogin, register as apiSignup, AuthResponse } from "../api/auth";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
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
          localStorage.setItem("user", JSON.stringify(data.user));

          set({
            user: data.user,
            isAuthenticated: true,
          });

          console.log("✅ Connexion réussie :", data.user);
        } catch (error) {
          console.error("❌ Erreur de connexion :", error);
          throw new Error(error instanceof Error ? error.message : "Erreur de connexion");
        }
      },

      signup: async (username: string, email: string, password: string) => {
        try {
          const data: AuthResponse = await apiSignup(username, email, password);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          set({
            user: data.user,
            isAuthenticated: true,
          });

          console.log("✅ Inscription réussie :", data.user);
        } catch (error) {
          console.error("❌ Erreur d'inscription :", error);
          throw new Error(error instanceof Error ? error.message : "Erreur lors de l'inscription");
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
