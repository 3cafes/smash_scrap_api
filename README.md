# smash_scrap_api

## setup

0. **dependences** \
   npm install

1. **aller dans le dossier prisma et modifier la variable DATABASE_URL** \
   'mysql://USER:PASSWORD@HOST:PORT/DATABASE'

2. **initializer la base de donnée** \
   npx prisma migrate dev --preview-feature

3. **générer le client prisma** \
   npx prisma generate

4. **prisma ne supporte pas encore les blob (oups, j'aurais du utiliser sequelize) se connecter à la base de donnée mysql et faire les commandes suivantes:** \
   USE smash_scrap; \
   ALTER TABLE Player MODIFY img_blob BLOB(65536);

## run

**developpment:** \
npm run dev \

**start:** \
npm start

## routes

GET /api/player/all \
retourne les players sauvegardés en base de donnée

GET /api/player/scrap \
scrap les player sur le site de smash bros et les sauvegarde en base de donnée
