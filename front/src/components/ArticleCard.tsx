import React from "react";
import { Calendar, Globe, View } from "lucide-react";
import { format } from "date-fns";
import type { Article } from "../types";

interface ArticleCardProps {
  article: Article;
  onArticleClick: (article: Article) => void;
}

export function ArticleCard({ article, onArticleClick }: ArticleCardProps) {
  console.log("ArticleCard", article);
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
        <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            {article.author}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {article.date}
          </div>
          <div className="flex items-center">
            <View className="w-4 h-4 mr-1" />
            {article.views}
          </div>
        </div>
      </div>
    </article>
  );
}
