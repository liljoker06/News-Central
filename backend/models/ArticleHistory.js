const mongoose = require('mongoose');

const articleHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  articleId: {
    type: String, // L'ID spécifique de l'article provenant de l'API
    required: true,
  },
  sourceApi: {
    type: String, // Indique la source de l'API (newsapi, nytimes, gnews)
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    required: true,
  },
  searchQuery: {
    type: String, // La requête de recherche qui a permis de trouver cet article
    required: true,
  },
  viewedAt: {
    type: Date,
    default: Date.now, // Date de la consultation de l'article
  },
});

const ArticleHistory = mongoose.model('ArticleHistory', articleHistorySchema);
module.exports = ArticleHistory;
