// ====== TASKS ======
// Logique métier : ajout, suppression, rendu, check des tâches

import { saveTasks } from "./storage.js";
import { renderProgression } from "./progression.js";

export let tasks = [];
export let lastClickedTask = null;

export function setTasks(newTasks) {
  tasks = newTasks;
}

// ── Ajout ──

export function addTask(btn) {
  const form = btn.closest(".task-form");
  if (!form) return;

  const input = form.querySelector(".taskInput");
  const typeInput = form.querySelector(".task-type:checked");

  if (input.value === "") return;

  tasks.push({
    id: crypto.randomUUID(),
    text: input.value,
    done: false,
    type: typeInput ? typeInput.dataset.type : "other",
  });

  input.value = "";
  saveTasks(tasks, progression);
  renderTasks();
}

// ── Rendu ──

export function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let i = 0;

  tasks.forEach((task) => {
    if (i >= 10) return;

    const li = document.createElement("li");

    if (task.done) li.classList.add("done");

    li.innerHTML = `
      <div class="task-text-wrapper check-task-trigger">
        <p class="check-task-trigger">${task.text}</p>
      </div>
      <span class="delete" data-id="${task.id}">✖</span>
      <div class="checkbox" data-id="${task.id}" class="task-checkbox">
        <i class="fi fi-br-check icon"></i>
      </div>
      <div class="type-wrapper">
        <span class="type ${task.type}" data-type="${task.type}">${task.type}</span>
      </div>
    `;

    li.classList.add("check-task-trigger");
    list.appendChild(li);

    const p = li.querySelector("p");

    if (lastClickedTask === task.id) {
      if (task.done) {
        requestAnimationFrame(() => p.classList.add("done"));
      } else {
        requestAnimationFrame(() => p.classList.remove("done"));
      }
    } else {
      task.done ? p.classList.add("done") : p.classList.remove("done");
    }

    i++;
  });

  seeMoreTasks();
}

// ── Voir plus ──

function seeMoreTasks() {
  const seeMoreTasksEl = document.getElementById("todo-see-more");
  if (!seeMoreTasksEl) return;

  const firstLi = document.querySelector(".tasks li:first-child");
  if (tasks.length >= 10) {
    seeMoreTasksEl.style.display = "";
    if (firstLi) firstLi.classList.add("faded-out");
  } else {
    seeMoreTasksEl.style.display = "none";
    if (firstLi) firstLi.classList.remove("faded-out");
  }
}

// ── Events (click global) ──

// progression est importé ici via un getter pour éviter les imports circulaires
let progression = {};
export function setProgressionRef(ref) {
  progression = ref;
}

export function initTaskEvents() {
  document.addEventListener("click", (e) => {
    // Délégation : clic sur la zone texte → déclenche la checkbox
    if (e.target.classList.contains("check-task-trigger")) {
      const clickedLi = e.target.closest("li");
      if (clickedLi) clickedLi.querySelector(".checkbox")?.click();
    }

    const id = e.target.dataset.id;
    if (!id) return;

    // ── Checkbox ──
    if (e.target.classList.contains("checkbox")) {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      task.done = !task.done;
      lastClickedTask = task.id;

      const type = task.type.toLowerCase();
      if (progression[type] !== undefined) {
        progression[type] += task.done ? 10 : -10;
      }

      saveTasks(tasks, progression);
      renderTasks();
      renderProgression(progression);
      return;
    }

    // ── Suppression ──
    if (e.target.classList.contains("delete")) {
      tasks = tasks.filter((t) => t.id !== id);
    }

    saveTasks(tasks, progression);
    renderTasks();
    renderProgression(progression);
  });

  // Touche Entrée → clique sur tous les boutons addTask
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      document.querySelectorAll(".addTask").forEach((btn) => btn.click());
    }
  });
}