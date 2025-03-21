// routes/newsRoutes.js
const express = require('express');
const { searchNews } = require('../controllers/newsController'); 
const router = express.Router();


router.get('/news', searchNews); 

module.exports = router;
