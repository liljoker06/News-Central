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
  startDate: string;
  endDate: string;
  source: string;
  sortBy: 'popularity' | 'date';
}