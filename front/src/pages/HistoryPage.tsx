import { useState, useEffect } from "react";
import { fetchUserHistory, deleteHistoryArticle } from "../api/history";
import { HistoryFilter } from "../components/HistoryFilter";
import { HistoryList } from "../components/HistoryList";
import { filterHistoryArticles } from "../utils/filtre";
import { HistoryArticle, SearchHistoryFilters } from "../types";
import { useAuthStore } from "../store/authStore";

export function HistoryPage() {
  const [filters, setFilters] = useState<SearchHistoryFilters>({ keyword: "" });
  const [historyArticles, setHistoryArticles] = useState<HistoryArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<HistoryArticle[]>([]);
  const { user } = useAuthStore(); // Récupérer l'utilisateur connecté
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) return;

    const getHistory = async () => {
      setLoading(true);
      const history = await fetchUserHistory(user.id);
      setHistoryArticles(history);
      setFilteredArticles(history);
      setLoading(false);
    };

    getHistory();
  }, [user]);

  useEffect(() => {
    const filtered = filterHistoryArticles(historyArticles, filters);
    setFilteredArticles(filtered);
  }, [filters, historyArticles]);

  const handleArticleClick = (article: HistoryArticle) => {
    if (!article.url) {
      console.error("❌ URL invalide :", article);
      return;
    }
    window.open(article.url, "_blank"); 
  };
  

  const handleDelete = async (id: string) => {
    await deleteHistoryArticle(id);
    setHistoryArticles((prev) => prev.filter((article) => article.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Historique des articles consultés</h2>
        <HistoryFilter filters={filters} onFilterChange={setFilters} />

        <div className="mt-8">
          {loading ? (
            <p className="text-gray-500">Chargement de l'historique...</p>
          ) : filteredArticles.length === 0 ? (
            <p className="text-gray-500">Aucun article trouvé dans votre historique.</p>
          ) : (
            <HistoryList
              articles={filteredArticles}
              onArticleClick={handleArticleClick}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>
    </div>
  );
}
