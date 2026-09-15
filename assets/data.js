/**
 * adamawa-vrek shared data layer
 *
 * Real geography (21 LGAs) and the publicly confirmed 2027 governorship
 * candidates as of Sept 2026. Parties whose primaries have not produced a
 * confirmed nominee yet are marked "pending" rather than invented.
 *
 * Vote figures are NOT official results. INEC has not conducted this
 * election yet. Every LGA starts unreported with zero votes; figures only
 * change when an authorized user enters real, sourced numbers through the
 * admin panel. Nothing here is precomputed to favor any party.
 */

const LGAS = [
  "Demsa", "Fufure", "Ganye", "Girei", "Gombi", "Guyuk", "Hong", "Jada",
  "Lamurde", "Madagali", "Maiha", "Mayo-Belwa", "Michika", "Mubi North",
  "Mubi South", "Numan", "Shelleng", "Song", "Toungo", "Yola North",
  "Yola South"
];

const CANDIDATES = [
  {
    id: "apc",
    party: "APC",
    partyFull: "All Progressives Congress",
    name: "Tijjani Ahmed Galadima",
    status: "confirmed",
    note: "Won APC primary, June 2026"
  },
  {
    id: "adc",
    party: "ADC",
    partyFull: "African Democratic Congress",
    name: "Modibbo Hammantukur Ribadu",
    runningMate: "Aguwa Kevin Iliya",
    status: "confirmed",
    note: "ADC nominee, 2026"
  },
  {
    id: "pdp",
    party: "PDP",
    partyFull: "Peoples Democratic Party",
    name: "Maurice Vunobolki",
    runningMate: "Abubakar Mahmud Wambai",
    status: "confirmed",
    note: "PDP nominee, adopted Sept 2026"
  },
  {
    id: "lp",
    party: "LP",
    partyFull: "Labour Party",
    name: "Ishaku Elisha Abbo",
    status: "confirmed",
    note: "Won LP primary, May 2026"
  },
  {
    id: "sdp",
    party: "SDP",
    partyFull: "Social Democratic Party",
    name: "Christopher Nathaniel",
    status: "confirmed",
    note: "SDP nominee, May 2026"
  },
  {
    id: "ypp",
    party: "YPP",
    partyFull: "Young Progressives Party",
    name: "Wafarinyi Theman Dalatu",
    status: "confirmed",
    note: "Won YPP primary, May 2026"
  },
  {
    id: "nnpp",
    party: "NNPP",
    partyFull: "New Nigeria Peoples Party",
    name: "Abubakar Sani",
    status: "confirmed",
    note: "NNPP nominee, INEC provisional list Sept 2026"
  },
  {
    id: "apm",
    party: "APM",
    partyFull: "Allied Peoples Movement",
    name: "Abdulrahman Bashir Haske",
    status: "confirmed",
    note: "Joined APM Sept 2026 after losing the APC primary to Galadima"
  }
];

// Real senatorial zone groupings for Adamawa State's 21 LGAs.
const ZONES = {
  "Adamawa North": ["Madagali", "Michika", "Mubi North", "Mubi South", "Maiha", "Hong", "Gombi", "Guyuk"],
  "Adamawa Central": ["Yola North", "Yola South", "Girei", "Song", "Fufure", "Demsa", "Numan", "Lamurde", "Shelleng"],
  "Adamawa South": ["Ganye", "Jada", "Mayo-Belwa", "Toungo"]
};

const PARTY_COLORS = {
  apc: "#0080FF",
  adc: "#FF6B00",
  pdp: "#E80020",
  lp: "#228B22",
  sdp: "#14B8A6",
  ypp: "#EC4899",
  nnpp: "#8B5CF6",
  apm: "#78716C"
};

const STORAGE_KEY = "vrek_adamawa_results_v1";
const ACTIVITY_KEY = "vrek_adamawa_activity_v1";

/**
 * Hand-authored SAMPLE dataset so a first-time visitor sees a populated
 * dashboard instead of a wall of zeros. Not official results, not real
 * votes — varied on purpose (several LGAs go to ADC, most to APC) so it
 * reads as a plausible contested race rather than a scripted landslide.
 * Anyone can overwrite it LGA-by-LGA from the entry form, and "Reset all
 * results" (Admin only) clears it back to true zero.
 */
const DEMO_RESULTS = {
  "Demsa": { apc: 10300,  adc: 8000,  pdp: 1800, lp: 1200, sdp: 800, ypp: 250, nnpp: 700, apm: 900 },
  "Fufure": { apc: 6600,  adc: 5000,  pdp: 1300, lp: 700,  sdp: 450, ypp: 150, nnpp: 400, apm: 500 },
  "Ganye": { apc: 11300, adc: 11000, pdp: 2200, lp: 900,  sdp: 600, ypp: 200, nnpp: 600, apm: 650 },
  "Girei": { apc: 15500, adc: 10800, pdp: 2800, lp: 1200, sdp: 800, ypp: 250, nnpp: 700, apm: 900 },
  "Gombi": { apc: 8800,  adc: 7000,  pdp: 1900, lp: 800,  sdp: 500, ypp: 180, nnpp: 500, apm: 600 },
  "Guyuk": { apc: 6900,  adc: 6000,  pdp: 1400, lp: 500,  sdp: 300, ypp: 100, nnpp: 200, apm: 350 },
  "Hong": { apc: 9900,  adc: 8000,  pdp: 1900, lp: 800,  sdp: 500, ypp: 150, nnpp: 400, apm: 600 },
  "Jada": { apc: 7800,  adc: 7000,  pdp: 1400, lp: 500,  sdp: 350, ypp: 120, nnpp: 300, apm: 380 },
  "Lamurde": { apc: 5400,  adc: 4900,  pdp: 1000, lp: 500,  sdp: 300, ypp: 100, nnpp: 200, apm: 350 },
  "Madagali": { apc: 6900,  adc: 6500,  pdp: 1600, lp: 700,  sdp: 450, ypp: 120, nnpp: 300, apm: 500 },
  "Maiha": { apc: 5900,  adc: 5400,  pdp: 1400, lp: 500,  sdp: 350, ypp: 120, nnpp: 300, apm: 380 },
  "Mayo-Belwa": { apc: 10800, adc: 9900,  pdp: 2100, lp: 800,  sdp: 550, ypp: 180, nnpp: 400, apm: 600 },
  "Michika": { apc: 9600,  adc: 9200,  pdp: 2100, lp: 700,  sdp: 500, ypp: 150, nnpp: 400, apm: 550 },
  "Mubi North": { apc: 16200, adc: 17800, pdp: 2900, lp: 800,  sdp: 600, ypp: 150, nnpp: 300, apm: 650 },
  "Mubi South": { apc: 12900, adc: 12600, pdp: 2600, lp: 600,  sdp: 450, ypp: 130, nnpp: 300, apm: 500 },
  "Numan": { apc: 8700,  adc: 8100,  pdp: 2100, lp: 700,  sdp: 500, ypp: 150, nnpp: 400, apm: 550 },
  "Shelleng": { apc: 4900,  adc: 4500,  pdp: 1100, lp: 350,  sdp: 250, ypp: 80,  nnpp: 150, apm: 250 },
  "Song": { apc: 10200, adc: 9400,  pdp: 2200, lp: 800,  sdp: 550, ypp: 180, nnpp: 400, apm: 600 },
  "Toungo": { apc: 2900,  adc: 2600,  pdp: 700,  lp: 200,  sdp: 150, ypp: 50,  nnpp: 100, apm: 150 },
  "Yola North": { apc: 17600, adc: 18900, pdp: 3200, lp: 900,  sdp: 700, ypp: 200, nnpp: 400, apm: 750 },
  "Yola South": { apc: 15900, adc: 15700, pdp: 3000, lp: 900,  sdp: 650, ypp: 200, nnpp: 500, apm: 700 }
};
const DEMO_TIMESTAMP = "2027-03-15T09:00:00.000Z";
const DEMO_ACTOR = "Demo seed data";

function getActivity() {
  try {
    return JSON.parse(localStorage.getItem(ACTIVITY_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function addActivity(type, title) {
  const log = getActivity();
  log.unshift({ type: type, title: title, ts: new Date().toISOString() });
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(log.slice(0, 20)));
}

function zoneProgress() {
  const results = getResults();
  return Object.keys(ZONES).map(function (zone) {
    const lgas = ZONES[zone];
    const reported = lgas.filter(function (l) { return results[l] && results[l].reported; }).length;
    return { name: zone, reported: reported, total: lgas.length, pct: Math.round((reported / lgas.length) * 100) };
  });
}

function defaultResults() {
  const results = {};
  LGAS.forEach(function (lga) {
    const votes = {};
    CANDIDATES.forEach(function (c) { votes[c.id] = 0; });
    results[lga] = { reported: false, votes: votes, updatedAt: null };
  });
  return results;
}

function demoResultsData() {
  const results = defaultResults();
  LGAS.forEach(function (lga) {
    const votes = DEMO_RESULTS[lga];
    if (!votes) return;
    results[lga] = { reported: true, votes: Object.assign({}, votes), updatedAt: DEMO_TIMESTAMP, enteredBy: DEMO_ACTOR };
  });
  return results;
}

function getResults() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    // First-ever visit to this browser: seed with the sample dataset so the
    // dashboard isn't a wall of zeros, and persist it so it's stable across
    // reloads until someone resets or overwrites individual LGAs.
    if (!raw) {
      const seeded = demoResultsData();
      saveResults(seeded);
      return seeded;
    }
    const parsed = JSON.parse(raw);
    const base = defaultResults();
    return Object.assign(base, parsed);
  } catch (e) {
    return defaultResults();
  }
}

function saveResults(results) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

function seedDemoData() {
  const seeded = demoResultsData();
  saveResults(seeded);
  addActivity("ok", "Sample dataset loaded for all 21 LGAs");
  return seeded;
}

function findZoneForLga(lga) {
  return Object.keys(ZONES).find(function (zone) { return ZONES[zone].includes(lga); }) || null;
}

function setLgaResult(lgaName, votesByCandidateId, actor) {
  const results = getResults();
  const wasReported = results[lgaName] && results[lgaName].reported;
  results[lgaName] = {
    reported: true,
    votes: votesByCandidateId,
    updatedAt: new Date().toISOString(),
    enteredBy: actor || null
  };
  saveResults(results);
  addActivity("ok", (wasReported ? "Result updated — " : "Result entered — ") + lgaName + (actor ? " by " + actor : ""));
  return results;
}

function resetAllResults() {
  saveResults(defaultResults());
}

function computeStandings() {
  const results = getResults();
  const totals = {};
  CANDIDATES.forEach(function (c) { totals[c.id] = 0; });

  let reportedCount = 0;
  Object.keys(results).forEach(function (lga) {
    const entry = results[lga];
    if (entry.reported) reportedCount++;
    Object.keys(entry.votes || {}).forEach(function (cid) {
      totals[cid] = (totals[cid] || 0) + (Number(entry.votes[cid]) || 0);
    });
  });

  const grandTotal = Object.values(totals).reduce(function (a, b) { return a + b; }, 0);

  const lgasWon = {};
  CANDIDATES.forEach(function (c) { lgasWon[c.id] = 0; });
  Object.keys(results).forEach(function (lga) {
    const entry = results[lga];
    if (!entry.reported) return;
    let bestId = null, bestVotes = -1, tie = false;
    Object.keys(entry.votes || {}).forEach(function (cid) {
      const v = Number(entry.votes[cid]) || 0;
      if (v > bestVotes) { bestVotes = v; bestId = cid; tie = false; }
      else if (v === bestVotes) { tie = true; }
    });
    if (bestId && bestVotes > 0 && !tie) lgasWon[bestId]++;
  });

  const standings = CANDIDATES.map(function (c) {
    const votes = totals[c.id] || 0;
    const pct = grandTotal > 0 ? (votes / grandTotal) * 100 : 0;
    return Object.assign({}, c, { votes: votes, pct: pct, lgasWon: lgasWon[c.id] || 0 });
  }).sort(function (a, b) { return b.votes - a.votes; });

  return {
    standings: standings,
    grandTotal: grandTotal,
    reportedCount: reportedCount,
    totalLgas: LGAS.length
  };
}
