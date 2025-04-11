# 🔖 News Central — Fullstack Dockerized App

Bienvenue sur **News Central** 🚀

Une application fullstack complète construite avec :
- **React (Vite)** pour le frontend
- **Node.js / Express** pour le backend
- **MongoDB** pour la base de données
- Le tout orchestré par **Docker Compose** avec un reverse proxy **NGINX** pour un environnement de dev & prod propre et isolé.

> **Images Docker personnalisées utilisées** 🐳  
> - Backend : [`liljoker/backend:v1`](https://hub.docker.com/r/liljoker/backend)
> - Frontend : [`liljoker/frontend:v1`](https://hub.docker.com/r/liljoker/frontend)

---

## 🚀 Stack Technique

- **Frontend** : React + Vite
- **Backend** : Node.js + Express
- **Base de données** : MongoDB
- **Reverse Proxy** : NGINX
- **Conteneurisation** : Docker & Docker Compose

---

## 📦 Installation & Démarrage

### 1. Prérequis

Assurez-vous d’avoir installé :

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/)

### 2. Cloner le projet

```bash
git clone https://github.com/ton-repo/news-central.git
cd news-central
```

### 3. Configurer les variables d’environnement

Créez les fichiers `.env.front` et `.env.backend` à la racine du projet.

#### `.env.front`

```env
NODE_ENV=development
VITE_API_URL=/api
```

#### `.env.backend`

```env
MONGODB_URI=mongodb://mongo:27017/news-central
PORT=5000
NEWSAPI_KEY=your_newsapi_key
NYTIMES_API_KEY=your_nytimes_api_key
GNEWS_API_KEY=your_gnews_api_key
JWT_SECRET=your_jwt_secret
```

> 📘 **Astuce :** Ne versionnez pas ces fichiers `.env`. Utilisez des fichiers `.env.example` pour partager le projet.

> 🔗 **Liens pour les clés API :**
> - [NewsAPI](https://newsapi.org/)
> - [New York Times API](https://developer.nytimes.com/get-started)
> - [GNews](https://gnews.io/)

### 4. Lancer le projet avec Docker 🚢

Construisez et démarrez tous les services avec :

```bash
docker-compose up -d --build
```

### 5. Accéder à l’application

| Service             | URL                           |
|--------------------|-------------------------------|
| Frontend (Vite)    | http://localhost:8080          |
| Backend (API via NGINX) | http://localhost:8080/api/   |
| MongoDB            | mongodb://localhost:27017 *(via client MongoDB)* |

---

## 🐳 Docker Compose — Images utilisées

Voici la configuration actuelle des services dans `docker-compose.yml` :

```yaml
version: '3.8'

services:
  mongo:
    image: mongo:latest
    container_name: mongo
    ports:
      - '27017:27017'
    volumes:
      - mongo-data:/data/db
    networks:
      - app-network
    restart: always

  backend:
    image: liljoker/backend:v1
    container_name: backend
    expose:
      - '5000'
    env_file:
      - .env.backend
    depends_on:
      - mongo
    networks:
      - app-network
    restart: always

  front:
    image: liljoker/frontend:v1
    container_name: frontend
    expose:
      - '5173'
    env_file:
      - .env.front
    depends_on:
      - backend
    networks:
      - app-network
    restart: always

  nginx:
    image: nginx:latest
    container_name: nginx
    ports:
      - '8080:80'
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - front
      - backend
    networks:
      - app-network
    restart: always

volumes:
  mongo-data:

networks:
  app-network:
    driver: bridge
```

---

## ⚙️ Commandes utiles

| Commande                      | Description                           |
|------------------------------|---------------------------------------|
| `docker-compose up -d --build` | Build et démarre les containers      |
| `docker-compose down`          | Stoppe et supprime les containers    |
| `docker-compose logs -f backend` | Affiche les logs du backend         |
| `docker-compose logs -f nginx`   | Affiche les logs du reverse proxy   |

---

## 👨‍💻 Développement

- Le backend et le frontend communiquent via le proxy NGINX.
- MongoDB est persistant grâce au volume Docker (`mongo-data`).
- Les services utilisent un réseau interne Docker (`app-network`).

---

## 📚 Questions Fréquentes

> **1. Pourquoi utiliser un reverse proxy NGINX ?**  
> Pour centraliser les accès front et back via un seul port (`localhost:8080`) et simplifier le routage et la sécurité.

> **2. Quelle est la différence entre `expose:` et `ports:` dans Docker ?**  
> `expose:` rend le port accessible aux autres services Docker seulement.  
> `ports:` mappe un port du container vers la machine hôte pour un accès externe.

> **3. Pourquoi utiliser des fichiers `.env` séparés pour front et back ?**  
> Pour mieux organiser et isoler les configurations spécifiques de chaque service.

> **4. Comment persister les données MongoDB ?**  
> Grâce au volume Docker `mongo-data` qui conserve les données même si le container est recréé.

---

## 📚 License

Ce projet est sous licence **MIT**.

---

## 🌟 Remerciements

Merci pour votre intérêt dans ce projet ! N’hésitez pas à contribuer ou à partager vos améliorations 🚀

---

*Projet pédagogique pour maîtriser Docker, React, Node.js et MongoDB en environnement conteneurisé.*

