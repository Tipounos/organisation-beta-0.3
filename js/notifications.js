// ── Crée le conteneur une seule fois ──────────────────
function getContainer() {
    let container = document.getElementById('notif-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notif-container';
        document.body.appendChild(container);
    }
    return container;
}

// ── API publique ───────────────────────────────────────
// type  → "success" | "danger" | "accent" | "secondary"
// duration → ms (défaut 3000)
export function notify(message, type = 'secondary', duration = 3000) {
    const container = getContainer();

    const notif = document.createElement('div');
    notif.classList.add('notif', `notif-${type}`);
    notif.textContent = message;

    container.appendChild(notif);

    // Anime l'entrée (le requestAnimationFrame force le reflow)
    requestAnimationFrame(() => {
        requestAnimationFrame(() => notif.classList.add('notif-show'));
    });

    // Sortie + suppression
    setTimeout(() => {
        notif.classList.remove('notif-show');
        notif.addEventListener('transitionend', () => notif.remove(), { once: true });
    }, duration);
}

export function createPopup({
    title = "Popup",
    text = "",
    buttons = []
}) {
    const popup = document.createElement("div");
    popup.className = "popup on";

    popup.innerHTML = `
        <div class="popupText">
            <h1>${title}</h1>
            <p>${text}</p>
        </div>
        <div class="popup-btns"></div>
    `;

    const btnContainer = popup.querySelector(".popup-btns");

    buttons.forEach(btn => {
        const button = document.createElement("button");

        button.textContent = btn.text;
        button.className = btn.class || "btn-primary";

        button.addEventListener("click", () => {
            if (btn.close !== false) {
                popup.remove();
            }

            if (typeof btn.onClick === "function") {
                btn.onClick();
            }
        });

        btnContainer.appendChild(button);
    });

    btnContainer.style.gridTemplateColumns =
        buttons.length === 1 ? "1fr":
        buttons.length === 2 ? "3fr 1fr":
        `repeat(${buttons.length}, 1fr)`;

    document.body.appendChild(popup);

    return popup;
}