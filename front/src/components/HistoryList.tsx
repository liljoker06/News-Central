import  { useState } from "react";
import { MoreVertical, Clock, Trash } from "lucide-react";
import { format } from "date-fns";
import type { HistoryArticle } from "../types";

interface HistoryListProps {
  articles: HistoryArticle[];
  onArticleClick: (article: HistoryArticle) => void;
  onDelete: (id: string) => void;
}

export function HistoryList({
  articles,
  onArticleClick,
  onDelete,
}: HistoryListProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    onDelete(id);
    setOpenMenuId(null);
  };

  return (
    <div className="space-y-1 bg-white rounded-lg shadow-md">
      {articles.map((article) => (
        <div
          key={article.id}
          className="group flex items-center justify-between p-3 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
        >
          <div
            className="flex-1 flex items-center space-x-4"
            onClick={() => onArticleClick(article)}
          >
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">{article.title}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(article.viewedAt), "HH:mm")} -{" "}
                {format(new Date(article.viewedAt), "dd/MM/yyyy")}
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuId(openMenuId === article.id ? null : article.id);
              }}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>

            {openMenuId === article.id && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => handleDelete(article.id)}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <Trash className="w-4 h-4" />
                  <span>Supprimer</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
