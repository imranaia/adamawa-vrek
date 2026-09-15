# Adamawa VREK

A plain HTML/CSS/JavaScript vote-reconciliation dashboard for the **2027 Adamawa State governorship election**, styled after [AARufaee/vrec](https://github.com/AARufaee/vrec)'s visual system (Syne/Outfit/IBM Plex Mono type, live badge + ticker, leading banner, stat cards, party table, donut + bar charts via Chart.js, Font Awesome icons) and page structure (home, admin login, dashboard, charts, progress, state results, LGA results).

## What this is

- Tracks results across all **21 Local Government Areas** of Adamawa State, grouped into its 3 real senatorial zones (Adamawa North, Central, South).
- Candidate list reflects **publicly confirmed 2026 primary outcomes** as of the time this was built. Parties without a confirmed nominee yet are marked `PENDING` rather than invented.
- Every LGA starts **unreported with zero votes** — the 2027 election has not happened. Standings, the "currently leading" banner, the charts, and the ticker are all computed live from whatever results an admin enters; nothing is hardcoded to favor any candidate or party. Until a result is entered, the leading banner reads "No results yet" instead of naming a leader.
- The "transparency feed" logs real actions taken on the site (an admin saving or updating an LGA's result) instead of scripted incident stories.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Main intelligence dashboard — hero, leading banner, stat cards, party table, donut chart, zone progress, activity feed, LGA grid |
| `admin-login.html` | Login gate for entering results |
| `dashboard.html` | Admin-only statewide overview |
| `state-results.html` | Statewide standings + result entry form |
| `lga-results.html` | Per-LGA drill-down |
| `charts.html` | Donut + bar charts (Chart.js) of statewide vote share |
| `progress.html` | Collation progress by zone and by LGA |

## Data & storage

- `assets/data.js` holds the LGA list, candidate list, and localStorage-backed result helpers.
- Results are stored in the browser's `localStorage` — **there is no backend**, so entries are local to whoever's browser enters them and are not shared between visitors.
- This is not connected to INEC and does not publish official results. Official results come only from the Independent National Electoral Commission.

## Admin login

`admin-login.html` is a **client-side demo gate only** (`assets/auth.js`), using a hardcoded demo credential (`admin` / `adamawa2027`) checked entirely in the browser. It exists to mirror vrec's page structure, not to provide real access control. Do not use this pattern to protect anything sensitive — a static site has no server to enforce it.

## Running locally

No build step. Open `index.html` in a browser, or serve the folder with any static file server:

```
npx serve .
```
