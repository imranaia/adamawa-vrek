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
  "Demsa", "Fufure", "Ganye", "Gireri", "Gombi", "Guyuk", "Hong", "Jada",
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
    name: "Candidate not yet confirmed",
    status: "pending",
    note: "Primary outcome unconfirmed as of Sept 2026"
  },
  {
    id: "lp",
    party: "LP",
    partyFull: "Labour Party",
    name: "Candidate not yet confirmed",
    status: "pending",
    note: "Primary outcome unconfirmed as of Sept 2026"
  },
  {
    id: "nnpp",
    party: "NNPP",
    partyFull: "New Nigeria Peoples Party",
    name: "Candidate not yet confirmed",
    status: "pending",
    note: "Primary outcome unconfirmed as of Sept 2026"
  }
];

const STORAGE_KEY = "vrek_adamawa_results_v1";

function defaultResults() {
  const results = {};
  LGAS.forEach(function (lga) {
    const votes = {};
    CANDIDATES.forEach(function (c) { votes[c.id] = 0; });
    results[lga] = { reported: false, votes: votes, updatedAt: null };
  });
  return results;
}

function getResults() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultResults();
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

function setLgaResult(lgaName, votesByCandidateId) {
  const results = getResults();
  results[lgaName] = {
    reported: true,
    votes: votesByCandidateId,
    updatedAt: new Date().toISOString()
  };
  saveResults(results);
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

  const standings = CANDIDATES.map(function (c) {
    const votes = totals[c.id] || 0;
    const pct = grandTotal > 0 ? (votes / grandTotal) * 100 : 0;
    return Object.assign({}, c, { votes: votes, pct: pct });
  }).sort(function (a, b) { return b.votes - a.votes; });

  return {
    standings: standings,
    grandTotal: grandTotal,
    reportedCount: reportedCount,
    totalLgas: LGAS.length
  };
}
