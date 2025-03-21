// routes/newsRoutes.js
const express = require('express');
const { searchNews, getPopularNews } = require('../controllers/newsController'); 
const authenticateUser = require("../middlewares/auth");
const router = express.Router();


router.get('/news', searchNews); 
router.get("/popular", authenticateUser, getPopularNews);

module.exports = router;
