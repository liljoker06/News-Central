// src/api/auth.js
import axios from 'axios';

// API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL;

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, {
      username,
      email,
      password,
    });
    
    return response.data;  // Doit correspondre au type AuthResponse
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Erreur d\'inscription');
    } else {
      throw new Error(error.message || 'Erreur lors de l\'enregistrement');
    }
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });

    localStorage.setItem('token', response.data.token);
    return response.data;  // Doit correspondre au type AuthResponse
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Erreur de connexion');
    } else {
      throw new Error(error.message || 'Erreur lors de la connexion');
    }
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
