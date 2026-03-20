# Backend Cloudflare

Backend gratuit prévu pour Cloudflare Pages Functions + D1.

## Ce qui est inclus

- `functions/api/health.js`
- `functions/api/login.js`
- `functions/api/logout.js`
- `functions/api/bootstrap.js`
- `functions/api/state.js`
- `backend/schema.sql`
- `backend/seed.json`

## Binding attendu

Nom du binding D1 :

- `APP_DB`

## Routes

- `GET /api/health`
- `POST /api/login`
- `POST /api/logout`
- `GET /api/bootstrap`
- `GET /api/state`
- `POST /api/state`

## Remarque

Le frontend actuel reste majoritairement local-first. Cette base backend est prête pour une bascule progressive vers une vraie persistance partagée.
