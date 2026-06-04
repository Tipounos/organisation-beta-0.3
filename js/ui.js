// ====== UI ======
// Date/heure, sidebar hamburger, popups génériques

// ── Date & heure ──

export function updateDate() {
  const dateEl = document.getElementById("date");
  const timeEl = document.getElementById("time");
  const date = new Date();

  timeEl.innerText = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  dateEl.innerText = new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function initClock() {
  updateDate();
  setInterval(updateDate, 1000);
}

// ── Sidebar hamburger ──

export function initSidebar() {
  const toggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("visible");
    toggle.classList.add("open");
    toggle.setAttribute("aria-label", "Fermer le menu");
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("visible");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-label", "Ouvrir le menu");
  }

  toggle.addEventListener("click", () => {
    sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
  });

  overlay.addEventListener("click", closeSidebar);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) closeSidebar();
  });
}

// ── Boutons de fermeture génériques (.close[data-target]) ──

export function initCloseButtons() {
  document.querySelectorAll(".close").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) target.classList.remove("on");
    });
  });
}

// ── Boutons "Ajouter une tâche" ──

export function initAddTaskButtons(addTaskFn) {
  const desktopBtn = document.getElementById("add-task-btn");
  const mobileBtn = document.getElementById("add-task-mobile-btn");
  const addTaskPopup = document.getElementById("createTaskPopup");

  // Desktop : ajoute directement la tâche
  desktopBtn.addEventListener("click", () => addTaskFn(desktopBtn));    


  // Mobile : ouvre le popup ou ajoute selon la taille d'écran
  if (document.body.clientWidth <= 1024) {
    desktopBtn.textContent = "Ajouter une tâche";
    desktopBtn.addEventListener("click", () => addTaskPopup.classList.add("on"));
    window.alert("mobile")
  }

  if (mobileBtn) {
    mobileBtn.addEventListener("click", () => addTaskFn(mobileBtn));
  }
}