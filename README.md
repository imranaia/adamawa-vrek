# Adamawa VREK

A plain HTML/CSS/JavaScript vote-reconciliation dashboard for the **2027 Adamawa State governorship election**, styled after [AARufaee/vrec](https://github.com/AARufaee/vrec)'s visual system (Syne/Outfit/IBM Plex Mono type, live badge + ticker, leading banner, stat cards, party table, donut + bar charts via Chart.js, Font Awesome icons) and page structure (home, admin login, dashboard, charts, progress, state results, LGA results).

## What this is

- Tracks results across all **21 Local Government Areas** of Adamawa State, grouped into its 3 real senatorial zones (Adamawa North, Central, South).
- Candidate list reflects **publicly confirmed 2026 primary outcomes** as of the time this was built. Parties without a confirmed nominee yet are marked `PENDING` rather than invented.
- A **hand-authored sample dataset** (`DEMO_RESULTS` in `assets/data.js`) auto-loads the first time any browser opens the site, so the dashboard shows a populated, varied race instead of a wall of zeros — several LGAs go to ADC, most to APC, nothing is a uniform landslide. It's clearly labeled sample data throughout (banners, footer, activity feed) and can be reloaded anytime from State Results ("Load sample data") or cleared back to true zero ("Reset all results", Admin only).
- Standings, the "currently leading" banner, the charts, and the ticker are all computed live from whatever's actually stored — nothing is hardcoded to favor any candidate or party. Overwrite any LGA from the entry form and everything recomputes from that.
- The "transparency feed" logs real actions taken on the site (an officer saving or updating an LGA's result, including who did it) instead of scripted incident stories.
- Three officer tiers actually restrict what you can do — see below — unlike vrec's own role picker, which is decorative (every role there shares one login and gets identical, full access).
- Clicking any LGA chip (on the dashboard or Progress page) opens `lga-results.html` pre-selected to that LGA, showing its own donut chart, senatorial zone, leading party, margin, and full candidate breakdown.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Main intelligence dashboard — hero, leading banner, stat cards, party table, donut chart, zone progress, activity feed, clickable LGA grid |
| `admin-login.html` | Role-based login gate for entering results |
| `dashboard.html` | Officer overview — statewide for Admin/State, scoped to one LGA for an LGA Officer |
| `state-results.html` | Statewide standings + result entry form (scoped by role), plus sample-data load/reset |
| `lga-results.html` | Per-LGA drill-down with its own donut chart — accepts `?lga=<name>` to deep-link from a chip |
| `charts.html` | Donut + bar charts (Chart.js) of statewide vote share |
| `progress.html` | Collation progress by zone and by clickable LGA |

## Data & storage

- `assets/data.js` holds the LGA list, candidate list, senatorial-zone groupings, and localStorage-backed result helpers.
- Results are stored in the browser's `localStorage` — **there is no backend**, so entries are local to whoever's browser enters them and are not shared between visitors.
- This is not connected to INEC and does not publish official results. Official results come only from the Independent National Electoral Commission.

## Officer roles

`admin-login.html` and `assets/auth.js` implement three tiers, scoped sensibly for a single state's governorship race (no fabricated ward/polling-unit hierarchy):

| Role | Demo password | Access |
|---|---|---|
| Admin | `adamawa2027` | Enter/edit any LGA, plus the destructive "reset all results" action |
| State Officer | `state2027` | Enter/edit any LGA, no reset access |
| LGA Officer | `lga2027` | Locked to entering/editing results for the one LGA picked at login — the LGA selector on the entry form is disabled to just that LGA |

This is still a **client-side demo gate only** — the checks run entirely in the browser, so a static site with no backend can't truly enforce access control (anyone can read `auth.js` or use devtools to bypass it). It's real enough to demonstrate the intended workflow, not to protect anything sensitive.

## Running locally

No build step. Open `index.html` in a browser, or serve the folder with any static file server:

```
npx serve .
```
