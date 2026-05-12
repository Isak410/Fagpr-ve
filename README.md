Prosjekt oppsett instruksjoner:

1. npm i

2. sett opp database
   -legg til postgres database url i .env med varnavn: DATABASE_URL
   -npx prisma db push
   -npx prisma generate

3. sett opp vercel blob storage
   -sett opp vercel blob storage med public data i vercel
   -legg inn read write token til blobstorage i .env med varnavn: BLOB_READ_WRITE_TOKEN

4. Lett til NEXTAUTH_URL i .env, f.eks. https://an.no:PORT

5. Legg til NEXTAUTH_SECRET i .env

6. start server i dev eller build mode
   For dev:
   -npm run dev
   For build
   -npm run build
   -npm start
