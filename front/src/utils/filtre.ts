import type { Article, HistoryArticle, SearchFilters, SearchHistoryFilters } from "../types";

export function filterArticles(
  articles: Article[],
  filters: SearchFilters
): Article[] {
  let filtered = articles;

  if (filters.keyword) {
    console.log("Filtre par mot-clé:", filters.keyword);
    filtered = filtered.filter((article) => {
      console.log("Article actuel:", article);
      const title = article.title ? article.title.toLowerCase() : "";
      const description = article.description ? article.description.toLowerCase() : "";
      return (
        title.includes(filters.keyword.toLowerCase()) ||
        description.includes(filters.keyword.toLowerCase())
      );
    });
  }
  if (filters.category !== "all") {
    filtered = filtered.filter(
      (article) => article.category === filters.category
    );
  }

  // par tranche de date
  if (filters.startDate) {
    filtered = filtered.filter(
      (article) => new Date(article.publishedAt) >= new Date(filters.startDate)
    );
  }

  if (filters.endDate) {
    filtered = filtered.filter(
      (article) => new Date(article.publishedAt) <= new Date(filters.endDate)
    );
  }

  if (filters.sortBy === "date") {
    filtered.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } else if (filters.sortBy === "popularity") {
    // au besoin
  }

  return filtered;
}

export function filterHistoryArticles(
  articles: HistoryArticle[],
  filters: SearchHistoryFilters
): HistoryArticle[] {
  let filtered = articles;

  if (filters.keyword) {
    filtered = filtered.filter(
      (article) =>
        article.title.toLowerCase().includes(filters.keyword.toLowerCase())
    );
  }

  return filtered;
}