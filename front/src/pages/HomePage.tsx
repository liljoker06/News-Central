import { useState, useEffect } from "react";
import { fetchPopularNews, fetchRecentNews, Article } from "../api/news";

function HomePage() {
  const [popularArticles, setPopularArticles] = useState<Article[]>([]);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      const [popular, recent] = await Promise.all([fetchPopularNews(), fetchRecentNews()]);
      setPopularArticles(popular);
      setRecentArticles(recent);
      setLoading(false);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {popularArticles.slice(0, 4).map((article, index) => (
              <a key={index} href={article.url} target="_blank" rel="noopener noreferrer">
                <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-100">{article.title}</h2>
                    <p className="text-sm text-gray-400 mt-1">✍️ {article.author}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Articles du Jour */}
          <h2 className="text-2xl font-semibold text-gray-100 mt-8 mb-4">Nouveaux Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {recentArticles.slice(0, 4).map((article, index) => (
              <a key={index} href={article.url} target="_blank" rel="noopener noreferrer">
                <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-100">{article.title}</h2>
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
