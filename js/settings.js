import { clearStorage } from "./storage.js";

let vibrations

export function canVibrate() {
    vibrations = localStorage.getItem("vibrations") || false
    vibrations = vibrations === "true"    

    return vibrations
}

document.addEventListener("DOMContentLoaded", () => {
    // Get elements

    const toggleVibrationsEl = document.getElementById("vibrations")    

    // Init settings
    canVibrate()
    
    toggleVibrationsEl.checked = canVibrate()

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

