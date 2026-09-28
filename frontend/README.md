# Multimodal Security System — React

A role-based security monitoring dashboard with separate **Admin** and **User**
workspaces, full **light / dark theme** support, and zero UI dependencies
beyond React itself (all icons and the activity chart are hand-rolled SVG —
no icon or chart library to install).

## Running it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build a static production bundle:

```bash
npm run build
npm run preview
```

## What's inside

- **Role select screen** — choose *Admin* or *User* (no real auth; this is a
  front-end demo). Admin opens in dark mode by default, User in light mode —
  both are fully switchable afterwards.
- **Admin sidebar**: Dashboard, Live Monitoring, Events & Alerts, Reports,
  Settings.
- **User sidebar**: Dashboard, Live Monitoring, Events & Alerts, Camera
  Management, Audio Analysis, Analytics, Reports, Settings (plus an "Admin
  Panel" shortcut to preview the admin workspace).
- **Dashboard**: 4 stat cards, 2 live camera tiles (click to open the detail
  modal), active alerts (dismissible), system health gauges (CPU/RAM/GPU +
  latency), a Security Activity chart with a working 1H/6H/24H/7D range
  toggle, the multimodal detection pipeline strip, and a searchable/
  filterable recent events table.
- **Settings**: the required Light/Dark theme switch, plus notification
  toggles and a role switcher.
- **Reports / Camera Management / Audio Analysis / Analytics**: scaffolded
  placeholder pages — the layout, theming and navigation already work, ready
  for real data.

## Project structure

```
src/
  main.jsx                 # React entry point
  App.jsx                  # Role + page routing, theme defaults per role
  styles.css                # All CSS — theme tokens + every component style
  context/ThemeContext.jsx  # Light/dark theme provider (React state, no localStorage)
  data/mockData.js          # Mock data shaped like a future API response
  components/               # Sidebar, Header, StatCards, CameraGrid, CameraModal,
                             # AlertsPanel, ActivityChart, SystemHealth,
                             # DetectionPipeline, EventsTable, icons.jsx
  pages/                    # DashboardPage, LiveMonitoringPage, EventsAlertsPage,
                             # SettingsPage, StubPage, RoleSelectPage
```

## Connecting a real backend later

All mock data lives in `src/data/mockData.js`. Replace the exported arrays
with `fetch()`/`useEffect()` calls (or React Query, etc.) in the components
that import them — no component needs to change shape, since every list item
already mirrors what a REST/GraphQL response would look like (ids,
timestamps, severities, etc.).
