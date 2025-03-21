import { useState, useEffect } from 'react';
import { Newspaper } from 'lucide-react';
import { NewsFilters } from '../components/NewsFilters';
import { ArticleCard } from '../components/ArticleCard';
import { useAuthStore } from '../store/authStore';
import { filterArticles } from "../utils/filtre";

import type { Article, SearchFilters } from '../types';

export function NewsPage() {

  const [filters, setFilters] = useState<SearchFilters>({
    keyword: '',
    category: 'all',
    startDate: '',
    endDate: '',
    source: '',
    sortBy: 'date',
  });

  // Temporary mock data for demonstration
  const articles: Article[] = [
    {
      id: '1',
      title: 'Sample News Article',
      description: 'This is a sample news article description that demonstrates the layout.',
      url: 'https://example.com',
      source: {
        name: 'Sample News',
        url: 'https://example.com'
      },
      publishedAt: new Date().toISOString(),
      category: 'technology',
      imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
  ];

  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

    useEffect(() => {
      const filtered = filterArticles(articles, filters); 
      setFilteredArticles(filtered);
    }, [filters]);
  
  const handleArticleClick = (article: Article) => {
    window.open(article.url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <NewsFilters filters={filters} onFilterChange={setFilters} />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.length === 0 ? (
            <p className="text-gray-500">
              Aucun article trouvé avec les critères sélectionnés.
            </p>
          ) : (
            <div className="grid grid-cols-1">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.url}
                  article={article}
                  onArticleClick={handleArticleClick}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


