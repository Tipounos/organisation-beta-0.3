// ====== NOTES ======

import { saveNotes, loadNotesFromStorage } from "./storage.js";

export function initNotes() {
  const notesEl = document.getElementById("notes");

  notesEl.value = loadNotesFromStorage();

  notesEl.addEventListener("input", () => {
    saveNotes(notesEl.value);
  });
}