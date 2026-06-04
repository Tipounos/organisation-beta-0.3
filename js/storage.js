// ====== STORAGE ======
// Toute la logique de persistance localStorage

export function saveTasks(tasks, progression) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("prog", JSON.stringify(progression));
}

export function loadTasksFromStorage() {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
}

export function loadProgressionFromStorage() {
  const data = localStorage.getItem("prog");
  return data ? JSON.parse(data) : {};
}

export function saveNotes(value) {
  localStorage.setItem("notes", value);
}

export function loadNotesFromStorage() {
  return localStorage.getItem("notes") || "";
}

export function clearStorage() {
  localStorage.clear()
}