// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ArticleHistory = require('../models/ArticleHistory');


// Fonction pour inscrire un nouvel utilisateur
const registerUser = async (req, res) => {
    const { username, email, password } = req.body; 
    // Vérification que tous les champs nécessaires sont présents
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
  
    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
      }
  
      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
      console.error('Erreur lors de l\'inscription de l\'utilisateur:', error);
      res.status(500).json({ message: 'Erreur serveur lors de l\'inscription' });
    }
  };
  

// Fonction pour authentifier un utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log('donnée reçue', req.body);

  if (!email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  try {

    const user = await User.findOne({ email });
    console.log('user trouvé ', user);
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }


    const isMatch = await bcrypt.compare(password, user.password);

    console.log('isMatch', isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    console.log('process.env.JWT_SECRET', process.env.JWT_SECRET);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log('token', token);

    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la connexion' });
  }
};

// Fonction pour récupérer l'historique de l'utilisateur
const getUserHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('history');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json(user.history); 
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'historique' });
  }
};

module.exports = { registerUser, loginUser, getUserHistory };
