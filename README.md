# Geo Meme Social App

MVP implementation of a location based meme sharing platform.

## Quick start

1. **Install dependencies**
   - `npm --prefix web install`
   - `npm --prefix server install`
2. **Set up PostgreSQL with PostGIS** and create database `geomeme`.
3. **Run migrations**
   - `psql geomeme < server/migrations/0001_init.sql`
   - `psql geomeme < server/migrations/0002_scoring.sql`
4. **Configure environment**
   - copy `.env.server` and adjust values if needed.
5. **Start backend**
   - `npm --prefix server run dev`
6. **Start frontend**
   - `npm --prefix web run dev`
7. **Dev login** using REST client `api.http` to obtain JWT token.
8. **Create a meme** on `/create` page and drop it on map.
9. **Vote and comment** in detail view.
10. **Run tests**
    - `npm --prefix server test`
    - `npm --prefix web run build`

## License
MIT
