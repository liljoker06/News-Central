import { useState, useEffect } from "react";
import { HistoryFilter } from "../components/HistoryFilter";
import { HistoryList } from "../components/HistoryList";
import { filterHistoryArticles } from "../utils/filtre";
import type { HistoryArticle, SearchHistoryFilters } from "../types";

export function HistoryPage() {
  const [filters, setFilters] = useState<SearchHistoryFilters>({
    keyword: "",
  });

  const [filteredArticles, setFilteredArticles] = useState<HistoryArticle[]>(
    []
  );

  // Temporary mock data for demonstration
  const historyArticle: HistoryArticle[] = [
    {
      id: "1",
      sourceApi: "newsapi",
      title: "Sample News Article",
      source: {
        name: "Sample News",
        url: "https://example.com",
      },
      publishedAt: "2022-01-01T00:00:00Z",
      category: "technology",
      viewedAt: new Date(),
    },
    {
      id: "2",
      sourceApi: "gnews",
      title: "Another News Article",
      source: {
        name: "Another News",
        url: "https://example.com",
      },
      publishedAt: "2022-01-02T00:00:00Z",
      category: "business",
      viewedAt: new Date(),
    },
  ];

  useEffect(() => {
    const filtered = filterHistoryArticles(historyArticle, filters);
    setFilteredArticles(filtered);
  }, [filters]);

  const handleArticleClick = (article: HistoryArticle) => {
    window.open(article.source.url, "_blank");
  };

  const handleDelete = (id: string) => {
    setFilteredArticles((prevArticles) =>
      prevArticles.filter((article) => article.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">
          Historique des articles consultés
        </h2>
        <HistoryFilter filters={filters} onFilterChange={setFilters} />

        <div className="mt-8">
          {filteredArticles.length === 0 ? (
            <p className="text-gray-500">
              Aucun article trouvé dans votre historique.
            </p>
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
