import axios from "axios";
import { HistoryArticle } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

// Ajouter un article à l'historique
export const addArticleToHistory = async (article: HistoryArticle) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Utilisateur non connecté");
  
      const response = await axios.post(`${API_URL}/history/add`, 
        {
          ...article,
          publishedAt: new Date(article.publishedAt).toISOString(), // ✅ Convertir la date en format ISO
        }, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      console.log("✅ Article ajouté à l'historique :", response.data);
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout à l'historique :", error);
    }
  };
  

// Récupérer l'historique d'un utilisateur
export const fetchUserHistory = async (userId: string): Promise<HistoryArticle[]> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Utilisateur non connecté");

    const response = await axios.get<HistoryArticle[]>(`${API_URL}/users/${userId}/history`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("✅ Historique récupéré :", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de l'historique :", error);
    return [];
  }
};

// Supprimer un article de l'historique
export const deleteHistoryArticle = async (articleId: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Utilisateur non connecté");

    await axios.delete(`${API_URL}/history/${articleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("🗑️ Article supprimé de l'historique :", articleId);
  } catch (error) {
    console.error("❌ Erreur lors de la suppression de l'article :", error);
  }
};
