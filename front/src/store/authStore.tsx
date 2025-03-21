import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as apiLogin, AuthResponse } from "../api/auth";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,

      // Vérifie si un token existe au démarrage
      checkAuth: () => {
        const storedToken = localStorage.getItem("token");
        console.log("🔄 Vérification de l'authentification :", storedToken);
        if (storedToken) {
          set({ token: storedToken, isAuthenticated: true });
        } else {
          set({ token: null, isAuthenticated: false });
        }
      },

      login: async (email: string, password: string) => {
        try {
          const data: AuthResponse = await apiLogin(email, password);
          localStorage.setItem("token", data.token);

          console.log("✅ Utilisateur connecté, isAuthenticated → true");

          set({
            token: data.token,
            isAuthenticated: true,
          });
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

        console.log("🚪 Utilisateur déconnecté, isAuthenticated → false");

        set({ token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
