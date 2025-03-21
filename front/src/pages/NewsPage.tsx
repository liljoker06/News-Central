import React, { useState } from 'react';
import { Newspaper } from 'lucide-react';
import { NewsFilters } from '../components/NewsFilters';
import { ArticleCard } from '../components/ArticleCard';
import { useAuthStore } from '../store/authStore';
import type { Article, SearchFilters } from '../types';

export function NewsPage() {
  const { user, logout } = useAuthStore();
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

  const handleArticleClick = (article: Article) => {
    window.open(article.url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Newspaper className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">News Central</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{user?.email}</span>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <NewsFilters filters={filters} onFilterChange={setFilters} />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onArticleClick={handleArticleClick}
            />
          ))}
        </div>
      </main>
    </div>
  );
}