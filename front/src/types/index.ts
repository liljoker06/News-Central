export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  source: {
    name: string;
    url: string;
  };
  publishedAt: string;
  category: string;
  imageUrl?: string;
}

export interface SearchFilters {
  keyword: string;
  category: string;
  date: string;
  source: string;
  sortBy: 'popularity' | 'date';
}

export interface SearchHistoryFilters {
  keyword: string;
}

export interface HistoryArticle {
  id: string;
  sourceApi: string;
  title: string;
  source: string; 
  url: string; 
  publishedAt: string;
  viewedAt: Date;
  imageUrl?: string;
}


