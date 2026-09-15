/**
 * Client-side login gate ONLY. This is a UI convenience, not real security:
 * anyone can read this file and the credential/role check happens entirely
 * in the browser. Do not rely on this to protect real results data — a
 * static HTML/CSS/JS site has no server to enforce access control.
 *
 * Three real tiers, scoped to a single state's governorship race
 * (no fabricated ward/polling-unit hierarchy):
 *   - admin: full control over every LGA, plus the destructive reset action.
 *   - state: can enter/edit results for any LGA, but cannot reset all data.
 *   - lga:   can only enter/edit results for the one LGA assigned at login.
 */

const ROLES = [
  { id: "admin", name: "Admin", scope: "Full control · all 21 LGAs · can reset data", icon: "fa-shield-halved", color: "#0080FF" },
  { id: "state", name: "State Officer", scope: "Enter/edit any LGA · no reset access", icon: "fa-map", color: "#00A86B" },
  { id: "lga", name: "LGA Officer", scope: "Restricted to one assigned LGA", icon: "fa-city", color: "#D4A017" }
];

const ROLE_PASSWORDS = { admin: "adamawa2027", state: "state2027", lga: "lga2027" };

const SESSION_KEY = "vrek_admin_session_v2";

function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch (e) {
    return null;
  }
}

function isLoggedIn() {
  return !!getSession();
}

function login(roleId, name, password, lga) {
  if (!ROLE_PASSWORDS[roleId] || password !== ROLE_PASSWORDS[roleId]) return false;
  if (roleId === "lga" && !lga) return false;

  const role = ROLES.find(function (r) { return r.id === roleId; });
  const session = {
    role: roleId,
    roleName: role.name,
    name: (name || "").trim() || role.name,
    lga: roleId === "lga" ? lga : null,
    since: new Date().toISOString()
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return true;
}

function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

function requireLogin(redirectTo) {
  if (!isLoggedIn()) {
    window.location.href = redirectTo || "admin-login.html";
  }
}

function canReset() {
  const s = getSession();
  return !!s && s.role === "admin";
}

function actorLabel() {
  const s = getSession();
  if (!s) return "Unknown";
  return s.name + " (" + s.roleName + (s.lga ? ", " + s.lga : "") + ")";
}
