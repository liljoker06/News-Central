# 📰 News Central — Fullstack Dockerized App

Bienvenue sur **News Central** !

Une application fullstack construite avec **React (Vite)** pour le frontend, **Node.js / Express** pour le backend, et **MongoDB** pour la base de données.

Le tout est orchestré avec **Docker Compose** pour un environnement de développement parfaitement isolé.

---

## 🚀 Stack Technique

- **Frontend** : React + Vite
- **Backend** : Node.js + Express
- **Base de données** : MongoDB
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

Créez un fichier `.env` dans le dossier `backend/` et ajoutez :

```bash
MONGODB_URI=mongodb://mongo:27017/news-central
PORT=5000

NEWSAPI_KEY=ta_cle_api_newsapi
NYTIMES_API_KEY=ta_cle_api_nytimes
GNEWS_API_KEY=ta_cle_api_gnews

JWT_SECRET=ta_cle_secrete
```

> 📘 **Astuce :** Ne pas versionner `.env`. Il est déjà dans `.gitignore`.

---

### 4. Lancer le projet avec Docker 🐋

```bash
docker compose up --build
```

### 5. Accéder à l’application

| Service            | URL                              |
|-------------------|-----------------------------------|
| Frontend (Vite)   | http://localhost:5173             |
| Backend (Express) | http://localhost:5000             |
| MongoDB           | mongodb://localhost:27017 *(via client MongoDB)* |

---

## ⚙️ Commandes utiles

| Commande                      | Description                           |
|------------------------------|---------------------------------------|
| `docker compose up --build`  | Build & démarre les containers        |
| `docker compose down`        | Stoppe et supprime les containers     |
| `docker compose logs -f`     | Affiche les logs en temps réel        |

---

## 🧰 Structure du projet

```
.
├── backend
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── server.js
│   └── .env.example
├── front
│   ├── src
│   ├── public
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## 🧑‍💻 Développement

- Le projet utilise le **hot reload** :
  - Frontend : modifications visibles instantanément sur le navigateur.
  - Backend : possibilité d’ajouter Nodemon pour rechargement automatique (optionnel).

- Le backend et le frontend communiquent via Docker Network.

- MongoDB est persistant grâce au volume Docker (`mongo-data`).

---

## 📝 Note

> Ce projet est conçu principalement pour apprendre et avoir une base solide avec **Vite**, **Node.js**, et **Docker**.
>
> ✅ Simple, efficace, et prêt à étendre si besoin.

---

## 📝 License

Ce projet est sous licence **MIT**.

---

## 🌟 Remerciements

Merci 🚀


---

