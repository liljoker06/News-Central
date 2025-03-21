import { useState, useEffect } from 'react';
import { addArticleToHistory } from "../api/history";
import { fetchPopularNews } from "../api/news";
import { NewsFilters } from '../components/NewsFilters';
import { ArticleCard } from '../components/ArticleCard';
import { useAuthStore } from '../store/authStore';
import { filterArticles } from "../utils/filtre";

import type { Article, SearchFilters } from '../types';

export function NewsPage() {
  const { user } = useAuthStore(); 
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: '',
    category: 'all',
    startDate: '',
    endDate: '',
    source: '',
    sortBy: 'date',
  });

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const cachedPopular = localStorage.getItem("popularArticles");
        if (cachedPopular) {
          setArticles(JSON.parse(cachedPopular));
        } else {
          const popular = await fetchPopularNews();
          const validPopular = popular.filter(article => article.title && article.imageUrl && article.date);

          localStorage.setItem("popularArticles", JSON.stringify(validPopular));
          setArticles(validPopular);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, []);

  useEffect(() => {
    setFilteredArticles(filterArticles(articles, filters));
  }, [articles, filters]);

  useEffect(() => {
    console.log("Filtres actuels:", filters);
    console.log("Articles avant filtrage:", articles.length);
    const filtered = filterArticles(articles, filters);
    console.log("Articles après filtrage:", filtered.length);
    setFilteredArticles(filtered);
  }, [articles, filters]);

  const handleArticleClick = async (article: Article) => {
    if (!user) return;
    await addArticleToHistory({
      userId: user.id,
      articleId: article.url,
      sourceApi: "News Central",
      title: article.title,
      source: article.author,
      url: article.url,
      publishedAt: article.date,
      imageUrl: article.imageUrl,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <NewsFilters filters={filters} onFilterChange={setFilters} />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="text-center text-xl text-gray-300">Chargement des articles...</div>
          ) 
          : filteredArticles.length === 0 ? (
            <p className="text-gray-500">Aucun article trouvé avec les critères sélectionnés.</p>
          ) : 
          (
            filteredArticles.map((article) => (
              console.log(article),
              <ArticleCard
                key={article.url}
                article={article}
                onArticleClick={handleArticleClick}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
