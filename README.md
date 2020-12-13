# smash_scrap_api

## setup

1. **aller dans le dossier prisma et modifier la variable DATABASE_URL** \
   'mysql://USER:PASSWORD@HOST:PORT/DATABASE'

2. **initializer la base de donnée** \
   npx prisma migrate dev --preview-feature

3. **générer le client prisma** \
   npx prisma generate

4. **prisma ne supporte pas encore les blob (oups, j'aurais du utiliser sequelize) se connecter à la base de donnée mysql et faire les commandes suivantes:** \
   use smash_scrap
   alter table Player modify img_blob BLOB(65536);

## run

**developpment:**
npm run dev

**start:**
npm start
