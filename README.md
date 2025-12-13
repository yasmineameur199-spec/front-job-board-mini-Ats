# Job-Board-Mini-ATS-Frontend
# JobBoard – Plateforme d’embauche complète

Une application web permettant aux utilisateurs de consulter des offres d’emploi, parcourir des catégories, s’inscrire et gérer leurs informations.
Le projet inclut un backend complet (API REST) ainsi qu’un frontend en EJS, avec une structure MVC.

# Description générale

IGS JobBoard est un site d’embauche qui permet :

de parcourir des catégories d’emploi (ex. Informatique, Santé, Finance…)

d’afficher les offres d’emploi publiées par les entreprises

de s’inscrire et se connecter en tant qu’utilisateur

de gérer ses informations

de consulter les détails d’une offre

et pour l’administrateur :

d’ajouter, modifier ou supprimer des emplois

de gérer les catégories

de gérer les relations job ↔ catégories

L’application est construite en deux parties :

Backend Node.js / Express / Sequelize (SQLite comme base de données)

Frontend EJS + HTML/CSS rendu côté serveur

# 🏗️ Technologies utilisées
Backend

Node.js

Express.js

Sequelize ORM

SQLite

Express-Validator (validation des données)

Method-Override (PUT/DELETE en formulaires HTML)

API REST structurée (CRUD Jobs, Categories, JobCategories)

Frontend

EJS (templates dynamiques)

HTML5 / CSS3

Partial templates (head, header, footer)

Formulaires d’inscription, connexion, ajout/édition d’offres, etc.

# 📂 Fonctionnalités principales
Utilisateur

Page d’accueil

Page de connexion

Page d'inscription

Parcourir les catégories

Consulter la liste des emplois

Voir le détail d’un job

Administrateur

Ajouter un job

Modifier un job

Supprimer un job

Ajouter / modifier / supprimer des catégories

Associer des jobs à des catégories

# Exemple de Structure des vues (EJS)
src/
 ├── views/
 │   ├── home.ejs
 │   ├── login.ejs
 │   ├── register.ejs
 │   ├── jobs/
 │   │    ├── list-job.ejs
 │   │    ├── add-job-form.ejs
 │   │    ├── edit-job-form.ejs
 │   ├── categories/
 │   │    ├── list-category.ejs
 │   │    ├── add-category.ejs
 │   │    ├── edit-category.ejs
 │   └── partials/
 │        ├── head.ejs
 │        ├── header.ejs
 │        └── footer.ejs

# 🚀 Installation et lancement
1. Installer les dépendances
npm install

2. Synchroniser la base de données

La base se crée automatiquement grâce à Sequelize :

npm start

3. Démarrer le serveur
npm start


Serveur disponible sur :
http://localhost:3000
