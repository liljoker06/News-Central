# Utilise l'image officielle Node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Exposer le port utilisé par l'application frontend
EXPOSE 5173

# Démarrer l'application Vite
CMD ["npm", "run", "dev"]
