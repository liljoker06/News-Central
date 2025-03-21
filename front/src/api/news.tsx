import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Interface pour représenter les articles API avant transformation
interface APIArticle {
  title?: string;
  author?: string;
  source?: { name?: string };
  urlToImage?: string;
  image?: string;
  publishedAt?: string;
  url?: string;
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

// Fonction pour transformer et filtrer les articles API en `Article`
const transformArticle = (article: APIArticle): Article | null => {
  const title = article.title?.trim() || "";
  const imageUrl = article.urlToImage || article.image || "";
  const date = article.publishedAt || "";
  const url = article.url || "";

  // 🔹 Vérifier si l'article a un **titre valide**
  if (!title || title === "Titre inconnu" || title.length < 5) {
    console.warn("⚠️ Article ignoré : titre invalide", article);
    return null;
  }

  // 🔹 Vérifier si l'article a une **image, une date et une URL**
  if (!imageUrl || !date || !url) {
    console.warn("⚠️ Article ignoré : données incomplètes", { title, imageUrl, date, url });
    return null;
  }

  return {
    title,
    author: article.author || article.source?.name || "Auteur inconnu",
    views: Math.floor(Math.random() * 5000),
    imageUrl,
    date: new Date(date).toLocaleDateString(),
    url,
  };
};

// 🔹 Récupérer les articles populaires
export const fetchPopularNews = async (): Promise<Article[]> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Utilisateur non connecté");

    const response = await axios.get<{ articles: APIArticle[] }>(`${API_URL}/news/popular`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.articles.map(transformArticle).filter(Boolean) as Article[];
  } catch (error) {
    console.error("Erreur lors de la récupération des articles populaires :", error);
    return [];
  }
};


  
