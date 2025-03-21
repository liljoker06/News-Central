const express = require('express');
const { registerUser, loginUser, getUserHistory } = require('../controllers/userController');
const router = express.Router();

// Route pour inscrire un nouvel utilisateur
router.post('/register', registerUser);

// Route pour connecter un utilisateur
router.post('/login', loginUser);

// Route pour récupérer l'historique des articles d'un utilisateur
router.get('/:userId/history', getUserHistory);

module.exports = router;
