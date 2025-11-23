# CampusHub — Microfrontends Demo (React + Vite + Module Federation)

This repository contains a simple microfrontend demo built with **React**, **Vite**, **TailwindCSS** and **Module Federation (Vite plugin)**.

Apps:
- `container` — Host app (shell + routing)
- `dashboard` — Remote app (cards, overview)
- `courses` — Remote app (courses list & details)
- `profile` — Remote app (user profile editor)

## How to run (local demo)

You need Node 18+ and npm/pnpm/yarn.

Install dependencies for each package and run dev servers:

```bash
# From the project root
# Install per-package or use a workspace manager
cd container && npm install
cd ../dashboard && npm install
cd ../courses && npm install
cd ../profile && npm install

# Start each app in a different terminal
cd container && npm run dev
cd dashboard && npm run dev
cd courses && npm run dev
cd profile && npm run dev
```

Open the container (default `http://localhost:5173`) and navigate between remotes.

## What is included

- Vite + React + Tailwind setup for each app
- Module Federation (Vite plugin) config to expose and consume remotes
- Simple UI with navigation and interactive pages
- README and GitHub Actions workflow templates for independent deployments

