# MERN Starter

A small React + Vite frontend and Express + MongoDB backend. The sample `Item`
collection demonstrates reading and writing MongoDB documents from the UI.

## Requirements

- Node.js 18 or newer
- MongoDB running locally, or a MongoDB connection string

## Setup

1. Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` to your
   MongoDB connection string. The default connects to a local database named
   `mern_starter`.
2. Copy `frontend/.env.example` to `frontend/.env` if you need to change the API
   URL.
3. From the project root, install dependencies and start both apps:

   ```sh
   npm install
   npm run dev
   ```

   Nodemon watches the backend files and restarts the API when they change;
   Vite serves the frontend. Press `Ctrl+C` to stop both.
4. Open the URL printed by Vite (normally `http://localhost:5173`). Add an item
   to create the MongoDB database/collection and save a document.

MongoDB creates the database and `items` collection on the first successful
write; no manual database creation is needed.

## API

- `GET /api/health` — API health check
- `GET /api/items` — list items
- `POST /api/items` — create an item with JSON body `{ "name": "Example" }`
- `GET /api/items/:id` — get an item
- `PATCH /api/items/:id` — update an item with JSON body `{ "name": "Updated" }`
- `DELETE /api/items/:id` — delete an item

The frontend uses `/` for the item list, `/items/new` to create an item, and
`/items/:id/edit` to update one.

## Structure

```text
frontend/
  public/
  src/
    assets/
    components/
    pages/
    layouts/
    hooks/
    services/
    context/
    utils/
backend/
  src/
    config/
    models/
    controllers/
    routes/
    middleware/
    services/
    utils/
```
