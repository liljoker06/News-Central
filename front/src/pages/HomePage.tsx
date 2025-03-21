import { useState } from "react";

// Interface pour les articles
interface Article {
  id: number;
  title: string;
  author: string;
  views: number;
  imageUrl: string;
  date: string;
}

const mockArticles: Article[] = [
  { 
    id: 1, 
    title: "Les secrets du succès", 
    author: "Alice Dupont", 
    views: 1200, 
    imageUrl: "https://source.unsplash.com/200x200/?success",
    date: "2025-03-20"
  },
  { 
    id: 2, 
    title: "L'impact de l'IA en 2025", 
    author: "Jean Martin", 
    views: 950, 
    imageUrl: "https://source.unsplash.com/200x200/?technology",
    date: "2025-03-19"
  },
  { 
    id: 3, 
    title: "10 astuces pour être plus productif", 
    author: "Emma Leroy", 
    views: 870, 
    imageUrl: "https://source.unsplash.com/200x200/?productivity",
    date: "2025-03-18"
  },
  { 
    id: 4, 
    title: "Les tendances tech de demain", 
    author: "David Bernard", 
    views: 800, 
    imageUrl: "https://source.unsplash.com/200x200/?future",
    date: "2025-03-17"
  },
  { 
    id: 5, 
    title: "Comment réussir son entreprise", 
    author: "Sophie Lemoine", 
    views: 750, 
    imageUrl: "https://source.unsplash.com/200x200/?business",
    date: "2025-03-16"
  },
];

function HomePage() {
  const [articles] = useState<Article[]>(mockArticles);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-3xl font-extrabold">📰 Actualités</div>
        <input
          type="text"
          placeholder="Rechercher des articles..."
          className="p-2 rounded-full bg-gray-800 text-white w-1/3"
        />
      </div>

      {/* Section des Articles Populaires */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Articles Populaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl duration-300"
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-100">{article.title}</h2>
                <p className="text-sm text-gray-400 mt-1">✍️ Par {article.author}</p>
                <p className="text-xs text-gray-500 mt-2">{article.date}</p>
                <p className="text-sm font-bold text-indigo-500 mt-2">{article.views} vues</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section des Nouveaux Articles */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Nouveaux Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {articles.slice(0, 3).map((article) => (
            <div
              key={article.id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl duration-300"
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-100">{article.title}</h2>
                <p className="text-sm text-gray-400 mt-1">✍️ Par {article.author}</p>
                <p className="text-xs text-gray-500 mt-2">{article.date}</p>
                <p className="text-sm font-bold text-indigo-500 mt-2">{article.views} vues</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Autres sections possibles (ex. recommandations) */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Recommandations</h2>
        {/* Tu peux ajouter ici d'autres articles ou contenus recommandés */}
      </div>
    </div>
  );
}

export default HomePage;
