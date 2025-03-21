const ArticleHistory = require('../models/ArticleHistory');
const User = require('../models/User');

const addArticleToHistory = async (req, res) => {
  try {
    const { userId, articleId, sourceApi, title, source, url, publishedAt, imageUrl } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    
    const parsedDate = new Date(publishedAt);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Format de date invalide pour publishedAt" });
    }

    
    const newArticleHistory = new ArticleHistory({
      user: userId,
      articleId,
      sourceApi,
      title,
      source,
      url,
      publishedAt: parsedDate, 
      imageUrl,  
    });

    await newArticleHistory.save();

    user.history.push(newArticleHistory._id);
    await user.save();

    res.status(201).json({ message: 'Article ajouté à l\'historique' });
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout à l\'historique de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout à l\'historique' });
  }
};

module.exports = { addArticleToHistory };
