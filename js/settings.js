import { clearStorage } from "./storage.js";

export function canVibrate() {
    let vibrations = localStorage.getItem("vibrations") || false
    vibrations = vibrations === "true"    

    return vibrations
}

document.addEventListener("DOMContentLoaded", () => {
    // Get elements

    const toggleVibrationsEl = document.getElementById("vibrations")    

    // Init settings
    canVibrate()
    
    toggleVibrationsEl.checked = vibrations

    const clearStorageEl = document.getElementById("clear-storage")

    clearStorageEl.addEventListener("click", () => {
        clearStorage()
        notify("Local storage cleared.", "accent", 1500)
    }) 

    toggleVibrationsEl.addEventListener("change", () => {
        vibrations = toggleVibrationsEl.checked        
        localStorage.setItem("vibrations", String(vibrations))
    })    
})

