// ====== MAIN ======
// Point d'entrée : initialise tout au chargement de la page

import { loadTasksFromStorage, loadProgressionFromStorage, saveTasks } from "./storage.js";
import { addTask, setTasks, renderTasks, initTaskEvents, setProgressionRef } from "./tasks.js";
import { renderProgression, initLevels, snapshotPreviousLevels } from "./progression.js";
import { initNotes } from "./notes.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("main.js init")

  // ── Données ──
  const tasks = loadTasksFromStorage();
  setTasks(tasks);

  let progression = loadProgressionFromStorage();

  // Si pas encore de progression, on l'initialise à partir des types déclarés dans le HTML
  if (Object.keys(progression).length === 0) {
    document.querySelectorAll(".stat h4").forEach((el) => {
      progression[el.dataset.type.trim().toLowerCase()] = 0;
    });
    saveTasks(tasks, progression);
  }

  // Passe la référence progression aux tâches (pour les mises à jour XP au click)
  setProgressionRef(progression);

  // ── Niveaux ──
  const taskTypes = document.querySelectorAll(".stat h4");
  initLevels(taskTypes);
  snapshotPreviousLevels();

  // ── Rendu initial ──
  renderProgression(progression);
  renderTasks();

  // ── Events globaux (clicks sur les tâches) ──
  initTaskEvents();
    initAddTaskButtons(addTask);
    initNotes()
});