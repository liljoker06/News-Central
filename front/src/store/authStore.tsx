// src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as apiLogin, register as apiRegister, AuthResponse } from '../api/auth';';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          const data: AuthResponse = await apiLogin(email, password);  // Utiliser AuthResponse
          set({
            user: { id: data.user.id, email },
            isAuthenticated: true,
          });
        } catch (error) {
          throw new Error(error.message || 'Erreur de connexion');
        }
      },
      signup: async (username: string, email: string, password: string) => {
        try {
          await apiRegister(username, email, password);
          set({
            user: { id: '', email },
            isAuthenticated: true,
          });
        } catch (error) {
          throw new Error(error.message || 'Erreur d\'inscription');
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
