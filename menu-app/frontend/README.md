# TCI Menu Generator - Frontend

Vite + React + Tailwind CSS, with Zustand for state management.

## Setup

```bash
cd frontend
npm install
```

## Run

```bash
npm run dev
```

The app will be available at `http://localhost:5174`.
Requests to `/api/*` are proxied to the FastAPI backend at `http://localhost:8001`.

## Structure

- `src/main.jsx` — entry point
- `src/App.jsx` — routes
- `src/pages/` — route-level pages (e.g. `AdminDashboard.jsx`)
- `src/store/` — Zustand stores (e.g. `usePackageStore.js`)
- `src/index.css` — Tailwind base / components / utilities
