const express = require('express');
const { addArticleToHistory } = require('../controllers/articleHistoryController');
const router = express.Router();


router.post('/add', addArticleToHistory);

module.exports = router;
