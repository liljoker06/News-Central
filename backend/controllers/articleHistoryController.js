const ArticleHistory = require('../models/ArticleHistory');
const User = require('../models/User');
const mongoose = require('mongoose');


const addArticleToHistory = async (req, res) => {
  const { userId, articleId, sourceApi, title, source, url, publishedAt, searchQuery, imageUrl } = req.body;

  try {

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Créer un nouvel article d'historique
    const newArticleHistory = new ArticleHistory({
      user: userId,
      articleId,
      sourceApi,
      title,
      source,
      url,
      publishedAt,
      searchQuery,
      imageUrl,  
    });

    await newArticleHistory.save();


    user.history.push(newArticleHistory._id);
    await user.save();

    res.status(201).json({ message: 'Article ajouté à l\'historique' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout à l\'historique de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout à l\'historique' });
  }
};

module.exports = { addArticleToHistory };
