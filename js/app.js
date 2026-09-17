// ================================================
//  SHARED APP UTILITIES – Digitaler Führerschein
// ================================================

// Hamburger menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu   = document.querySelector(".navbar-nav");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => navMenu.classList.toggle("open"));
  }
  // Mark active nav link
  const links = document.querySelectorAll(".navbar-nav a");
  links.forEach(l => {
    if (l.href === location.href) l.classList.add("active");
  });
});

// ── Progress helpers (localStorage) ─────────────
function getModuleProgress(mod) {
  try { return JSON.parse(localStorage.getItem("dfp_" + mod) || "{}"); }
  catch { return {}; }
}
function saveChapterDone(mod, idx) {
  const p = getModuleProgress(mod);
  p[idx] = true;
  localStorage.setItem("dfp_" + mod, JSON.stringify(p));
}
function isChapterDone(mod, idx) {
  return !!getModuleProgress(mod)[idx];
}
function countDone(mod, total) {
  const p = getModuleProgress(mod);
  return Object.keys(p).filter(k => p[k]).length;
}

// ── Checklist interactivity ──────────────────────
function initChecklists() {
  document.querySelectorAll(".checklist li").forEach(li => {
    li.addEventListener("click", () => {
      li.classList.toggle("checked");
      const box = li.querySelector(".cl-box");
      if (box) box.textContent = li.classList.contains("checked") ? "✓" : "";
    });
  });
}

// ── Quiz result stored in session ───────────────
function storeQuizPass(score, total) {
  sessionStorage.setItem("dfp_quiz_score", score);
  sessionStorage.setItem("dfp_quiz_total", total);
  sessionStorage.setItem("dfp_quiz_passed", score / total >= (MIN_PASS_PERCENT / 100) ? "1" : "0");
}
function getQuizResult() {
  return {
    score:  parseInt(sessionStorage.getItem("dfp_quiz_score")  || "0"),
    total:  parseInt(sessionStorage.getItem("dfp_quiz_total")  || "0"),
    passed: sessionStorage.getItem("dfp_quiz_passed") === "1"
  };
}
