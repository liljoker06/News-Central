const mongoose = require('mongoose');

const articleHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  articleId: {
    type: String, 
    required: true,
  },
  sourceApi: {
    type: String, 
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
  viewedAt: {
    type: Date,
    default: Date.now,
  },
  
  imageUrl: {
    type: String,
    default: null,
  },
});

const ArticleHistory = mongoose.model('ArticleHistory', articleHistorySchema);
module.exports = ArticleHistory;
