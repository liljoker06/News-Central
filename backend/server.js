require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 



const app = express();


app.use(express.json());

app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connexion à MongoDB réussie');
  })
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB:', error);
  });


const PORT = process.env.PORT || 5000;


app.get('/api', (req, res) => {
  res.send('Bienvenue sur API NewsCentral');
});

const newsRoutes = require('./routes/newsRoutes');
const userRoutes = require('./routes/userRoutes');


app.use('/api/news', newsRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
