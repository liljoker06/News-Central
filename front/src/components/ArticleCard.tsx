import React from 'react';
import { Calendar, Globe, Tag } from 'lucide-react';
import { format } from 'date-fns';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onArticleClick: (article: Article) => void;
}

export function ArticleCard({ article, onArticleClick }: ArticleCardProps) {
  return (
    <article 
      onClick={() => onArticleClick(article)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.description}
        </p>
        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            {article.source.name}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {format(new Date(article.publishedAt), 'MMM d, yyyy')}
          </div>
          <div className="flex items-center">
            <Tag className="w-4 h-4 mr-1" />
            {article.category}
          </div>
        </div>
      </div>
    </article>
  );
}