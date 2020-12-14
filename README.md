# smash_scrap_api

## setup

0. **dependances** \
   npm install

1. **aller dans le dossier prisma et modifier la variable DATABASE_URL** \
   'mysql://USER:PASSWORD@HOST:PORT/DATABASE'

2. **initialiser la base de données** \
   npx prisma migrate dev --preview-feature

3. **générer le client prisma** \
   npx prisma generate

4. **prisma ne supporte pas encore les blobs (oups, j'aurais du utiliser sequelize). Se connecter à la base de données mysql et faire les commandes suivantes:** \
   USE smash_scrap; \
   ALTER TABLE Player MODIFY img_blob BLOB(131072); \
   ALTER TABLE Item MODIFY img_blob BLOB(131072); \
   ALTER TABLE Stage MODIFY img_blob BLOB(131072);

## run

**developpment:** \
npm run dev \

**start:** \
npm start

## routes

GET /api/player/all \
retourne les players sauvegardés en base de données

GET /api/player/scrap \
scrap les players sur le site de smash bros et les sauvegardes en base de données

GET /api/item/all \
retourne les items sauvegardés en base de données

GET /api/item/scrap \
scrap les items sur le site de smash bros et les sauvegardes en base de données

GET /api/stage/all \
retourne les stages sauvegardés en base de données

GET /api/stage/scrap \
scrap les stages sur le site de smash bros et les sauvegardes en base de données
