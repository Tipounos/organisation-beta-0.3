import {notify, createPopup} from "./notifications.js"

// ====== PROGRESSION ======
// XP, niveaux, animations de level-up

let level = {};
let previousLevels = {};
const vibrations = localStorage.getItem("vibrations")

export let firstLoad = true;

export function setFirstLoad(val) {
  firstLoad = val;
}

export function getLevels() {
  return level;
}

export function initLevels(taskTypes) {
  taskTypes.forEach((el) => {
    const type = el.dataset.type.trim().toLowerCase();
    if (level[type] === undefined) level[type] = 0;
  });
}

export function snapshotPreviousLevels() {
  previousLevels = structuredClone(level);
}

// ── Calcul XP → niveau ──

const LEVEL_MULTIPLIER = 0.4;

function computeLevel(xp) {
  return Math.round(LEVEL_MULTIPLIER * Math.sqrt(xp) * 100) / 100;
}

// ── Rendu progression ──

export function renderProgression(progression) {
  Object.keys(progression).forEach((key) => {
    const typeStat = document.querySelector(`#${key}-completed`);
    if (!typeStat) return;

    typeStat.textContent = progression[key];

    if (progression[key] !== -1) {
      level[key] = computeLevel(progression[key]);
    }
  });

  renderLevel();
  console.log("renderProgression() executed");
  
}

// ── Rendu barres de niveau ──

function renderLevel() {
  document.querySelectorAll(".level-bar").forEach((bar) => {
    const type = bar.dataset.type;

    const oldLevel = previousLevels[type] || 0;
    const newLevel = Math.floor(level[type]);
    const progressInLevel = level[type] - newLevel;

    bar.classList.add(type);

    if (!firstLoad && Math.floor(oldLevel) < newLevel) {
      // Animation level-up : remplir à 100% → reset → remplir vers nouvelle valeur
      bar.style.transition = "transform 0.3s ease-in";
      bar.style.transform = "scaleX(1)";

      playLevelUpAnimation(type, newLevel);

      setTimeout(() => {
        bar.style.transition = "none";
        bar.style.transform = "scaleX(0)";

        requestAnimationFrame(() => {
          bar.style.transition = "transform 0.4s ease";
          bar.style.transform = `scaleX(${progressInLevel})`;
        });
      }, 450);
    } else {
      bar.style.transition = "transform 0.4s ease";
      bar.style.transform = `scaleX(${progressInLevel})`;
    }

    if (!firstLoad && Math.floor(oldLevel) > newLevel) {
      // Animation level-up : remplir à 100% → reset → remplir vers nouvelle valeur
      bar.style.transition = "transform 0.3s ease-in";
      bar.style.transform = "scaleX(0)";

      setTimeout(() => {
        bar.style.transition = "none";
        bar.style.transform = "scaleX(1)";

        requestAnimationFrame(() => {
          bar.style.transition = "transform 0.4s ease";
          bar.style.transform = `scaleX(${progressInLevel})`;
        });
      }, 450);
    }

    previousLevels[type] = newLevel;
  });

  // Texte des niveaux
  document.querySelectorAll("span.level").forEach((span) => {
    const type = span.dataset.type;
    span.textContent = "Level " + Math.floor(level[type]);
  });

  firstLoad = false;
}

// ── Popup level-up ──

function playLevelUpAnimation(type, lvl) {
  if (vibrations == "true") {
    navigator.vibrate(200, 100, 200, 100, 400)  
  }


  createPopup({
    title: "Bravo",
    text: `Vous avez atteint le niveau ${lvl} en <app-bold>${type}</app-bold> !`,
    buttons: [
      {
        text: "Fermer"
      }
    ]
  })
}

// ── Utilitaire barre XP (utilisable ailleurs si besoin) ──

export function animateXP(bar, from, to, onComplete) {
  bar.style.transition = "transform 0.4s ease";
  bar.style.transform = `scaleX(${from})`;

  requestAnimationFrame(() => {
    bar.style.transform = `scaleX(${to})`;
  });

  setTimeout(() => {
    if (onComplete) onComplete();
  }, 450);
}