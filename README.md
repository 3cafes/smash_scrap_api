# smash_scrap_api

# init ddb

go to prisma/.env and set database url
'mysql://USER:PASSWORD@HOST:PORT/DATABASE'

then use this command to generate the ddb import file
npx prisma migrate dev --name init --preview-feature

dev:
npm run dev

start:
npm start
