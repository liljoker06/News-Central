import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;  

// Fonction pour enregistrer un utilisateur
export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, {
      username,
      email,
      password,
    });
    
    return response.data; 
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
    return response.data; 
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

// Fonction pour se déconnecter
export const logout = () => {
  localStorage.removeItem('token');
};
