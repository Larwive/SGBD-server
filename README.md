# SGBD-server

Un serveur utilisant `express.js` pour implémenter une API faisant des requêtes SQL.

## Installation des dépendances
Faites `npm install` dans la racine du dépôt. Cela installera les packages de `package.json`.

## Lancement du serveur
Faites `npm start`.\
La variable `corsOptions` au début de `server.ts` énumère les urls pouvant effectuer des requêtes POST au serveur. La présence de `"*"` sert uniquement aux tests lorsque le front end est lancé en local.

## Les routes
Le dossier `routes` contient les différentes entrées pour les appels à l'API.
Les requêtes sont dans ces routes.
La route `/git` sert à la mise à jour automatique de l'hébergeur du serveur.

### Déploiement vers Glitch
Pushez ou mergez les pulls requests vers `main`.
Les fichiers `shrinkwrap.yaml`, `watch.json`.