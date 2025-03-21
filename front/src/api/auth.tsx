import axios, { AxiosError } from "axios";

// API URL from environment variable
const API_URL: string = import.meta.env.VITE_API_URL;

// Définition du type pour la réponse d'authentification
export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

// Définition d'un type pour les erreurs d'API
interface APIError {
  message: string;
}

// Fonction d'inscription
export const register = async (username: string, email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/users/register`, {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error((error.response.data as APIError).message || "Erreur d'inscription");
    }
    throw new Error("Erreur lors de l'enregistrement");
  }
};

// Fonction de connexion
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/users/login`, {
      email,
      password,
    }, {
      headers: { "Content-Type": "application/json" }
    });

    console.log("Réponse reçue :", response.data);

    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.error("Erreur Axios :", error.response.data);
      throw new Error(error.response.data.message || "Erreur de connexion");
    }
    throw new Error("Erreur lors de la connexion");
  }
};

// Vérifier si un utilisateur est authentifié
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};
