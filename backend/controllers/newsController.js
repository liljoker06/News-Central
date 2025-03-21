
const axios = require('axios');

const getNewsFromNewsAPI = async (queryParams) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: queryParams.keyword,
        from: queryParams.startDate,
        to: queryParams.endDate,
        apiKey: process.env.NEWSAPI_KEY,
      }
    });
    return response.data.articles; 
  } catch (error) {
    console.error('Erreur NewsAPI:', error);
    return []; 
  }
};

// Fonction pour récupérer les actualités depuis NYTimes API
const getNewsFromNYTimes = async (queryParams) => {
  try {
    const response = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
        q: queryParams.keyword,
        'begin_date': queryParams.startDate, 
        'end_date': queryParams.endDate,
        'api-key': process.env.NYTIMES_API_KEY,
      }
    });
    return response.data.response.docs;
  } catch (error) {
    console.error('Erreur NYTimes API:', error);
    return []; 
  }
};

// Fonction pour récupérer les actualités depuis GNews API
const getNewsFromGNews = async (queryParams) => {
  try {
    const response = await axios.get('https://gnews.io/api/v4/search', {
      params: {
        q: queryParams.keyword,
        from: queryParams.startDate,
        to: queryParams.endDate,
        lang: 'en', 
        token: process.env.GNEWS_API_KEY,
      }
    });
    return response.data.articles; 
  } catch (error) {
    console.error('Erreur GNews API:', error);
    return []; 
  }
};

// Fonction principale qui gère les appels aux trois APIs en parallèle
const searchNews = async (req, res) => {
  const { keyword, startDate, endDate } = req.query;

  try {
    // Lancer les appels API en parallèle
    const [newsApiArticles, nyTimesArticles, gNewsArticles] = await Promise.all([
      getNewsFromNewsAPI({ keyword, startDate, endDate }),
      getNewsFromNYTimes({ keyword, startDate, endDate }),
      getNewsFromGNews({ keyword, startDate, endDate })
    ]);

    // Combiner tous les articles récupérés des trois APIs
    const allArticles = [
      ...newsApiArticles,
      ...nyTimesArticles,
      ...gNewsArticles
    ];

    // Retourner les résultats combinés au frontend
    res.json({ articles: allArticles });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des actualités', error });
  }
};




// Fonction pour récupérer les actualités populaires (celles avec le plus de vues)
const getPopularNews = async (req, res) => {
  try {
    const [newsApiArticles, nyTimesArticles, gNewsArticles] = await Promise.all([
      getNewsFromNewsAPI({ keyword: "trending" }),
      getNewsFromNYTimes({ keyword: "trending" }),
      getNewsFromGNews({ keyword: "trending" }),
    ]);

    let allArticles = [...newsApiArticles, ...nyTimesArticles, ...gNewsArticles];

    // Trier par nombre de vues décroissant (on génère des vues aléatoires pour la démo)
    allArticles = allArticles
      .map((article) => ({
        ...article,
        views: Math.floor(Math.random() * 5000), // 🔹 Générer un nombre de vues aléatoire
      }))
      .sort((a, b) => b.views - a.views); // Trier du plus vu au moins vu

    res.json({ articles: allArticles.slice(0, 10) }); // Retourner les 10 plus populaires
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des actualités populaires", error });
  }
};




module.exports = { searchNews, getPopularNews };
