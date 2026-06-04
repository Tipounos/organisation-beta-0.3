document.addEventListener("DOMContentLoaded", () => {
    // Navbar

    class Navbar extends HTMLElement {
        connectedCallback() {
            this.innerHTML = `
            <div class="navbar">
                <!-- Hamburger (visible on mobile only) -->
                <button class="menu-toggle" id="menuToggle" aria-label="Ouvrir le menu">
                <span></span>
                <span></span>
                <span></span>
                </button>

                <div class="logo">
                <h3>Bienvenue</h3>
                </div>
                
                <div class="time-infos">
                <span id="date"></span>
                <span id="time"></span>        
                </div>
            </div>
            `
        }
    }

    customElements.define("app-navbar", Navbar)
})