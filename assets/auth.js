/**
 * Client-side login gate ONLY. This is a UI convenience, not real security:
 * anyone can read this file and the credential check happens entirely in
 * the browser. Do not rely on this to protect real results data — a static
 * HTML/CSS/JS site has no server to enforce access control. If this project
 * ever needs real authorization, that has to be added on a backend.
 */

const DEMO_USER = "admin";
const DEMO_PASS = "adamawa2027";
const SESSION_KEY = "vrek_admin_session";

function isLoggedIn() {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

function login(username, password) {
  if (username === DEMO_USER && password === DEMO_PASS) {
    sessionStorage.setItem(SESSION_KEY, "1");
    return true;
  }
  return false;
}

function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

function requireLogin(redirectTo) {
  if (!isLoggedIn()) {
    window.location.href = redirectTo || "admin-login.html";
  }
}
