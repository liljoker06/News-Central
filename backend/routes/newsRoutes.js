// routes/newsRoutes.js
const express = require('express');
const { searchNews, getPopularNews, getRecentNews } = require('../controllers/newsController'); 
const authenticateUser = require("../middlewares/auth");
const router = express.Router();


router.get('/news', searchNews); 
router.get("/news/popular", authenticateUser, getPopularNews);
router.get("/news/recent", authenticateUser, getRecentNews);

module.exports = router;
