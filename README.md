# Vehicle Booking System

Moderne bookingsystem for kjøretøy bygget med Next.js, TypeScript og Prisma ORM

Prosjektet ble utviklet som del av fagprøven i IT-utviklerfaget og inneholder både kunde- og ansattfunksjonalitet med rollebasert tilgang, autentisering og bookingsystem.

## Funksjoner

### Kunde

- Se tilgjengelige kjøretøy
- Se detaljside for kjøretøy
- Booke kjøretøy via kalender
- Se egne bookinger

### Ansatt

- Opprette kjøretøy
- Laste opp bilder
- Se alle bookinger
- Slette bookinger
- Rollebasert tilgang

---

## Teknologier

- Next.js App Router
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- HeroUI
- NextAuth
- Zod
- Vercel Blob Storage

## Teknisk innhold

Prosjektet benytter flere moderne Next.js-funksjoner:

- Server Components
- Client Components
- Parallel Routes
- Intercepting Routes
- Layouts
- Rollebasert Rendering
- API Routes
- SSR

Det er også implementert:

- filopplastning med validering
- autentisering og sessions
- kalenderhåndtering for bookede datoer
- database-relasjoner med Prisma ORM
- inputvalidering med Zod

---

## Oppsett av prosjekt

1. npm i

2. Sett opp database
   -legg til postgres database url i .env med varnavn: DATABASE_URL
   -npx prisma db push
   -npx prisma generate

3. Sett opp vercel blob storage
   -sett opp vercel blob storage med public data i vercel
   -legg inn read write token til blobstorage i .env med varnavn: BLOB_READ_WRITE_TOKEN

4. Legg til NEXTAUTH_URL i .env, f.eks. https://an.no:PORT

5. Legg til NEXTAUTH_SECRET i .env

6. Start server i dev eller build mode
   For dev:
   -npm run dev
   For build
   -npm run build
   -npm start
