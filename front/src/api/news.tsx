import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Interface pour représenter les articles API avant transformation
interface APIArticle {
  title?: string;
  author?: string;
  source?: { name?: string }; // Certaines APIs mettent l'auteur sous `source.name`
  urlToImage?: string;
  image?: string;
  publishedAt?: string;
  url: string;
}

// Interface pour les articles après transformation
export interface Article {
  title: string;
  author: string;
  views: number;
  imageUrl: string;
  date: string;
  url: string;
}

// Fonction pour transformer les articles API en `Article`
const transformArticle = (article: APIArticle): Article => ({
  title: article.title || "Titre inconnu",
  author: article.author || article.source?.name || "Auteur inconnu",
  views: Math.floor(Math.random() * 5000), // Générer un nombre aléatoire de vues
  imageUrl: article.urlToImage || article.image || "https://source.unsplash.com/200x200/?news",
  date: article.publishedAt || new Date().toISOString(),
  url: article.url || "#",
});

// 🔹 Récupérer les articles populaires
export const fetchPopularNews = async (): Promise<Article[]> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Utilisateur non connecté");

    const response = await axios.get<{ articles: APIArticle[] }>(`${API_URL}/news/popular`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.articles.map(transformArticle);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles populaires :", error);
    return [];
  }
};

// 🔹 Récupérer les articles récents
export const fetchRecentNews = async (): Promise<Article[]> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Utilisateur non connecté");

    const response = await axios.get<{ articles: APIArticle[] }>(`${API_URL}/news/recent`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.articles.map(transformArticle);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles récents :", error);
    return [];
  }
};
