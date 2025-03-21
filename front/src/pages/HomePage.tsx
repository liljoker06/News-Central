import { useState, useEffect } from "react";
import { fetchPopularNews, Article } from "../api/news";
import { addArticleToHistory } from "../api/history";
import { useAuthStore } from "../store/authStore";

function HomePage() {
  const [popularArticles, setPopularArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuthStore(); // Récupérer l'utilisateur connecté

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);

      try {
        const cachedPopular = localStorage.getItem("popularArticles");

        if (cachedPopular) {
          console.log("🗂️ Chargement des articles depuis le cache.");
          setPopularArticles(JSON.parse(cachedPopular));
        } else {
          console.log("🌐 Appel API pour récupérer les articles.");
          const popular = await fetchPopularNews();
          const validPopular = popular.filter(article => article.title && article.imageUrl && article.date);

          localStorage.setItem("popularArticles", JSON.stringify(validPopular));
          setPopularArticles(validPopular);
        }
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des articles :", error);
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  // Fonction pour enregistrer un article consulté
  const handleArticleClick = async (article: Article) => {
    if (!user) return;

    await addArticleToHistory({
      userId: user.id,
      articleId: article.url, // Utiliser l'URL comme identifiant unique
      sourceApi: "News Central",
      title: article.title,
      source: article.author,
      url: article.url,
      publishedAt: article.date,
      imageUrl: article.imageUrl,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="text-3xl font-extrabold">📰 Actualités</div>
      </div>

      {loading ? (
        <div className="text-center text-xl text-gray-300">Chargement des articles...</div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Articles Populaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularArticles.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                onClick={() => handleArticleClick(article)} // 📌 Enregistre l'article dans l'historique
              >
                <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-lg font-semibold text-gray-100 flex-grow">{article.title}</h2>
                    <p className="text-sm text-gray-400 mt-2">✍️ {article.author}</p>
                    <p className="text-xs text-gray-500 mt-2">📅 {article.date}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
