import { initClock, initSidebar, initCloseButtons, initAddTaskButtons } from "./ui.js";
import "./notifications.js"
import "./components.js"
import { addTask } from "./tasks.js";
import { initNotes } from "./notes.js"

document.addEventListener("DOMContentLoaded", () => {
  // ── UI ──
  initClock();
  initSidebar();
  initCloseButtons();
})