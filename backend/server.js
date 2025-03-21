require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.json());


app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connexion à MongoDB réussie');
  })
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB:', error);
  });


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
