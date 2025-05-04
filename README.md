# Nestjs + Svelte Template

- ### Install Guide
1. `git clone https://github.com/Luxw098/nestjs-svelte-template`
2. `cd nestjs-svelte-template`
3. `bun run setup`
3. `bun run db` If you want the Prisma ORM.
4. `bun run dev`
<br><br>

---
- ### Customization
1. Edit `backend/src/app.module.ts` to configure controllers and providers.
- Backend API
- Prisma ORM
- Accounts & JWTCookie Authentication *(Prisma Required)*
- Socket.IO Server
2. Edit `backend/prisma/schema.prisma` to configure your database.
- Default database is `SQLite`
3. run `bun run db` to update the database
4. If applicable, edit `backend/.env` to configure your `database URL`.
5. Setup ports at these locations:
- `backend/src/main.ts` for `NestJS/Back-end PORT`
- `frontend/vite.config.ts` for `Vite/Front-end PORTS`
6. Run `bun run dev` to start the server.
<br><br>

---
- ### Production
1. `bun run build` to generate the production build.
2. `bun run start` to start the production server.