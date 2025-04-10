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

### 4. Lancer le projet avec Docker 🛥️

Les images Docker sont disponibles sur Docker Hub :

- 🔗 Backend : [https://hub.docker.com/r/liljoker/backend](https://hub.docker.com/r/liljoker/backend)
- 🔗 Frontend : [https://hub.docker.com/r/liljoker/frontend](https://hub.docker.com/r/liljoker/frontend)

Démarrez l'application avec :

```bash
docker compose up
```

### 5. Accéder à l’application

| Service            | URL                              |
|-------------------|-----------------------------------|
| Frontend (Vite)   | http://localhost:5173             |
| Backend (Express) | http://localhost:5000             |
| MongoDB           | mongodb://localhost:27017 *(via client MongoDB)* |

---

## ⚙️ Commandes utiles

| Commande                    | Description                           |
|----------------------------|---------------------------------------|
| `docker compose up`        | Démarre les containers                |
| `docker compose down`      | Stoppe et supprime les containers     |
| `docker compose logs -f`   | Affiche les logs en temps réel        |

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
├── .dockerignore
├── docker-compose.yml
└── README.md
```

---

## 🧑‍💻 Développement

- Le backend et le frontend communiquent via le réseau Docker interne.
- MongoDB est persistant grâce au volume Docker (`mongo-data`).

---

## 📝 Questions de réflexion

> **1. Quelle est la différence entre `build:` et `image:` dans Docker Compose ?**  
> `build:` construit l'image localement à partir d'un Dockerfile.  
> `image:` utilise une image déjà prête et disponible sur un registre comme Docker Hub.  
> Dans ce projet, nous utilisons `image:` pour déployer les images construites et poussées sur Docker Hub.

> **2. Quel est l’intérêt d’utiliser un fichier `.env` dans un projet Docker ?**  
> Il permet de centraliser et de sécuriser les variables d'environnement sans les hardcoder dans les fichiers de configuration.

> **3. Comment les volumes Docker aident-ils à gérer la persistance des données ?**  
> Les volumes permettent de conserver les données même si le container est supprimé ou recréé.

> **4. Si vous deviez ajouter un quatrième service (ex : un reverse proxy NGINX), comment l’intégreriez-vous ?**  
> Il faudrait ajouter un nouveau service dans le `docker-compose.yml` avec l'image `nginx`, le configurer pour rediriger les requêtes vers le frontend et le backend, et s'assurer que tous les services partagent le même réseau Docker.

---

## 📝 Note finale

> Ce projet est conçu principalement pour apprendre et avoir une base solide avec **Vite**, **Node.js**, et **Docker Compose**.
>
> ✅ Simple, efficace, et prêt à étendre si besoin.

---

## 📝 License

Ce projet est sous licence **MIT**.

---

## 🌟 Remerciements

Merci 🚀

---

