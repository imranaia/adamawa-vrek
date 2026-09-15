# Adamawa VREK

A plain HTML/CSS/JavaScript vote-reconciliation dashboard for the **2027 Adamawa State governorship election**, modeled on the page structure of [AARufaee/vrec](https://github.com/AARufaee/vrec) (home, admin login, dashboard, charts, progress, state results, LGA results).

## What this is

- Tracks results across all **21 Local Government Areas** of Adamawa State.
- Candidate list reflects **publicly confirmed 2026 primary outcomes** as of the time this was built. Parties without a confirmed nominee yet are marked `PENDING` rather than invented.
- Every LGA starts **unreported with zero votes** — the 2027 election has not happened. Standings are computed live from whatever results an admin enters; nothing is hardcoded to favor any candidate or party.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Overview and candidate list |
| `admin-login.html` | Login gate for entering results |
| `dashboard.html` | Statewide overview (admin only) |
| `state-results.html` | Statewide standings + result entry form |
| `lga-results.html` | Per-LGA drill-down |
| `charts.html` | Canvas bar chart of statewide vote share |
| `progress.html` | Which LGAs have reported |

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
