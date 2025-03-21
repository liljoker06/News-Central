import { useState, useEffect } from "react";
import { fetchPopularNews, Article } from "../api/news";

function HomePage() {
  const [popularArticles, setPopularArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);

      try {
        // Vérifier si les articles sont en cache
        const cachedPopular = localStorage.getItem("popularArticles");
        const cachedRecent = localStorage.getItem("recentArticles");

        if (cachedPopular && cachedRecent) {
          console.log("🗂️ Chargement des articles depuis le cache.");
          setPopularArticles(JSON.parse(cachedPopular));
        } else {
          console.log("🌐 Appel API pour récupérer les articles.");
          const [popular, ] = await Promise.all([fetchPopularNews(),]);

          // Filtrer les articles vides pour éviter les problèmes d'affichage
          const validPopular = popular.filter(article => article.title && article.imageUrl && article.date);

          // Sauvegarde des articles dans le localStorage
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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="text-3xl font-extrabold">📰 Actualités</div>
      </div>

      {loading ? (
        <div className="text-center text-xl text-gray-300">Chargement des articles...</div>
      ) : (
        <>
          {/* Articles Populaires */}
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Articles Populaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularArticles.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
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
