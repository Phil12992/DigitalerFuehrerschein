// ================================================
//  APP UTILITIES – Digitaler Führerschein (2026)
// ================================================

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu   = document.querySelector(".navbar-nav");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => navMenu.classList.toggle("open"));
  }

  // Active Nav Link highlighting
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar-nav a").forEach(l => {
    const href = l.getAttribute("href");
    if (href === currentPath) {
      l.classList.add("active");
    } else {
      l.classList.remove("active");
    }
  });

  // Init checklists with persistent state
  initChecklists();
});

// ── Persistent Checklists ────────────────────────
function initChecklists() {
  document.querySelectorAll(".checklist li").forEach((li, idx) => {
    const checkId = "chk_" + window.location.pathname + "_" + idx;
    const isChecked = localStorage.getItem(checkId) === "1";
    
    if (isChecked) {
      li.classList.add("checked");
      const box = li.querySelector(".cl-box");
      if (box) box.textContent = "✓";
    }

    li.addEventListener("click", () => {
      li.classList.toggle("checked");
      const active = li.classList.contains("checked");
      localStorage.setItem(checkId, active ? "1" : "0");
      const box = li.querySelector(".cl-box");
      if (box) box.textContent = active ? "✓" : "";
    });
  });
}

// ── Progress Helpers ─────────────────────────────
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

// ── Quiz Results ─────────────────────────────────
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
