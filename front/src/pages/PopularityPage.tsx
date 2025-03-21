import { useState } from "react";

interface Article {
  id: number;
  title: string;
  author: string;
  views: number;
  imageUrl: string;
}

const mockArticles: Article[] = [
  { 
    id: 1, 
    title: "Les secrets du succès", 
    author: "Alice Dupont", 
    views: 1200, 
    imageUrl: "https://source.unsplash.com/200x200/?success"
  },
  { 
    id: 2, 
    title: "L'impact de l'IA", 
    author: "Jean Martin", 
    views: 950, 
    imageUrl: "https://source.unsplash.com/200x200/?technology"
  },
  { 
    id: 3, 
    title: "10 astuces productivité", 
    author: "Emma Leroy", 
    views: 870, 
    imageUrl: "https://source.unsplash.com/200x200/?productivity"
  },
  { 
    id: 4, 
    title: "Tendances tech", 
    author: "David Bernard", 
    views: 800, 
    imageUrl: "https://source.unsplash.com/200x200/?future"
  },
  { 
    id: 5, 
    title: "Réussir son business", 
    author: "Sophie Lemoine", 
    views: 750, 
    imageUrl: "https://source.unsplash.com/200x200/?business"
  },
  { 
    id: 6, 
    title: "Les innovations de 2025", 
    author: "Paul Dupuis", 
    views: 300, 
    imageUrl: "https://source.unsplash.com/200x200/?innovation"
  },
  { 
    id: 7, 
    title: "Les meilleurs outils de productivité", 
    author: "Claire Petit", 
    views: 1450, 
    imageUrl: "https://source.unsplash.com/200x200/?tools"
  },
  { 
    id: 8, 
    title: "Réussir à distance", 
    author: "Marc Lefevre", 
    views: 1100, 
    imageUrl: "https://source.unsplash.com/200x200/?remote"
  },
  { 
    id: 9, 
    title: "Comment gérer son temps efficacement", 
    author: "Juliette Martin", 
    views: 1300, 
    imageUrl: "https://source.unsplash.com/200x200/?time-management"
  },
  { 
    id: 10, 
    title: "Les tendances marketing de 2025", 
    author: "Romain Dufresne", 
    views: 900, 
    imageUrl: "https://source.unsplash.com/200x200/?marketing"
  },
  { 
    id: 11, 
    title: "Les tendances marketing de 2025", 
    author: "Romain Dufresne", 
    views: 1000, 
    imageUrl: "https://source.unsplash.com/200x200/?marketing"
  },
  { 
    id: 12, 
    title: "Les tendances marketing de 2025", 
    author: "Romain Dufresne", 
    views: 900, 
    imageUrl: "https://source.unsplash.com/200x200/?marketing"
  },
];

function PopularityPage() {
  const [articles] = useState<Article[]>(mockArticles);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📢 Articles Populaires</h1>

      {/* Grille compacte */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl">
        {articles.map((article) => (
          <div 
            key={article.id} 
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-2"
          >
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-32 object-cover rounded-md"
            />
            <div className="mt-2">
              <h2 className="text-sm font-semibold text-gray-900">{article.title}</h2>
              <p className="text-xs text-gray-500">✍️ {article.author}</p>
              <span className="text-xs font-bold text-indigo-600">{article.views} vues 🔥</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularityPage;
