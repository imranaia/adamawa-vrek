# Adamawa VREK

A plain HTML/CSS/JavaScript vote-reconciliation dashboard for the **2027 Adamawa State governorship election**, styled after [AARufaee/vrec](https://github.com/AARufaee/vrec)'s visual system (Syne/Outfit/IBM Plex Mono type, live badge + ticker, leading banner, stat cards, party table, donut + bar charts via Chart.js, Font Awesome icons) and page structure (home, admin login, dashboard, charts, progress, state results, LGA results).

## What this is

- Tracks results across all **21 Local Government Areas** of Adamawa State, grouped into its 3 real senatorial zones (Adamawa North, Central, South).
- Candidate list reflects **publicly confirmed 2026 primary outcomes** as of the time this was built. Parties without a confirmed nominee yet are marked `PENDING` rather than invented.
- Every LGA starts **unreported with zero votes** — the 2027 election has not happened. Standings, the "currently leading" banner, the charts, and the ticker are all computed live from whatever results an admin enters; nothing is hardcoded to favor any candidate or party. Until a result is entered, the leading banner reads "No results yet" instead of naming a leader.
- The "transparency feed" logs real actions taken on the site (an officer saving or updating an LGA's result, including who did it) instead of scripted incident stories.
- Three officer tiers actually restrict what you can do — see below — unlike vrec's own role picker, which is decorative (every role there shares one login and gets identical, full access).

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Main intelligence dashboard — hero, leading banner, stat cards, party table, donut chart, zone progress, activity feed, LGA grid |
| `admin-login.html` | Role-based login gate for entering results |
| `dashboard.html` | Officer overview — statewide for Admin/State, scoped to one LGA for an LGA Officer |
| `state-results.html` | Statewide standings + result entry form (scoped by role) |
| `lga-results.html` | Per-LGA drill-down |
| `charts.html` | Donut + bar charts (Chart.js) of statewide vote share |
| `progress.html` | Collation progress by zone and by LGA |

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
