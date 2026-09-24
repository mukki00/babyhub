# Baby Hub API

Node.js API deployed as Vercel Functions, matching the layered controller → service → repository architecture.

## Structure

```
api/index.js            Vercel serverless entry (wraps the Express app)
src/app.js               Express app: middleware + routes
src/routes/               public.routes.js (customer-facing), admin.routes.js (JWT-protected)
src/controllers/          HTTP request/response handling only
src/services/              Business logic (validation, orchestration)
src/repositories/          Oracle SQL data access only
src/middleware/             auth (JWT), error handling, multer upload
src/config/                 env, Oracle DB pool, Cloudinary
sql/schema.sql              Oracle Autonomous DB table definitions
```

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in Oracle Autonomous DB + Cloudinary + JWT secrets.
3. Place your Oracle Wallet files in `./wallet` (path set via `ORACLE_WALLET_LOCATION`).
4. Run `sql/schema.sql` against your Autonomous Database to create tables.
5. Create an admin user (hash the password with bcrypt) and insert it into `admins`.

## Run locally

- `npm run local` — plain Express server on `PORT` (default 3001).
- `npm run dev` — via Vercel CLI (`vercel dev`), matching production routing.

## API

Public: `GET /api/products`, `GET /api/products/:id`, `POST /api/orders`

Admin (Bearer JWT required, except login): `POST /api/admin/login`, `GET/POST /api/admin/products`, `PUT/DELETE /api/admin/products/:id`, `GET /api/admin/orders`
