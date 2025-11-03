# ProjectManagment

A lightweight project management frontend built with React.  
Provides pages for Home, Dashboard, Projects, New Project, Contact and Profile. Styling is centralized so pages share a consistent theme.

## Features
- Home: overview, top projects, recent activity, team shortcuts
- Dashboard: projects list, quick edit, teammates
- Project creation form (New Project)
- Profile page with stats, tasks and activity
- Contact page (local demo form)
- Client-side routing with react-router
- Shared CSS theme for consistent look-and-feel

## Prerequisites
- Node.js 16+ (recommended)
- npm (bundled with Node.js)

## Install
Open a terminal in the project root (Windows):
1. Install dependencies
   - npm install

## Run (development)
Start the dev server (Vite/CRA):
- npm run dev

Open the app in your browser at the URL printed by the dev server (commonly http://localhost:3000 or http://localhost:5173).

## Build (production)
- npm run build

## Project structure (important files)
- Frontend/
  - src/
    - App.jsx — router and page wiring
    - App.css (or pages.css) — shared theme CSS
    - pages/
      - Home.jsx
      - DashBoard.jsx
      - NewProject.jsx
      - Contact.jsx
      - Profile.jsx
    - components/
      - Navbar.jsx
- README.md — this file

## Common tasks
- Add a route: register page in `App.jsx` and add a `<Link>` in `Navbar.jsx`.
- Shared styles: keep global variables in `App.css` (or `pages.css`) and use classes like `page-root`, `card`, `btn`, `chip`, `avatar`.
- Use `react-router-dom` v6 for routing. If missing:
  - npm install react-router-dom@6

## Notes on extending
- Replace mock data with a backend API (Express, FastAPI, etc.) and secure endpoints (JWT/OAuth).
- Use React Query / SWR for data fetching & caching.
- Add unit tests with Vitest or Jest and component tests with React Testing Library.
- Consider Storybook for component-driven development.

## Contributing
1. Fork the repo.
2. Create a branch with a clear name (feature/…, fix/…).
3. Make changes, add tests.
4. Open a pull request describing your changes.

## Troubleshooting
- If you click a navbar link and the page doesn't render:
  - Ensure `App.jsx` imports the page and contains the matching `<Route path="...">`.
  - Ensure `Navbar.jsx` uses `<Link>` or `<NavLink>` from `react-router-dom`.
  - Check the browser console for errors and paste them when asking for help.

## License
MIT — see LICENSE file (add one if you need a specific license).

## Contact
This repo is for local development. For help, open an issue or message the maintainer.