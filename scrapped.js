// === Game State ===
let cookies = 0;
let cookiesPerClick = 1;
let upgradeCost = 10;
let cookieName = "Cookies";

// === Elements ===
const el = {
    cookieButton: document.getElementById("cookieButton"),
    cookieCount: document.getElementById("cookieCount"),
    upgradeButton: document.getElementById("upgradeButton"),
    openWindow: document.getElementById("openWindow"),
    popup: document.getElementById("popupWindow"),
    closeButton: document.querySelector("#popupWindow button"),
    resetButton: document.querySelector(".popupSettings button"),
    uploadImage: document.getElementById("uploadButtonImage"),
    cookieLabel: document.getElementById("cookieLabel"),
    cookieNameInput: document.getElementById("cookieNameInput")
};

// === Utility Functions ===
const setCookie = (name, value, days) => document.cookie = `${name}=${value};expires=${new Date(Date.now() + days*864e5).toUTCString()};path=/`;
const getCookie = (name) => (document.cookie.split("; ").find(row => row.startsWith(name + "=")) || "").split("=")[1] || null;

// === Toasts ===
function showToast(message) {
    document.querySelector(".toast, .toast-mobile")?.remove();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    el.toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// === Game Logic ===
function updateUI() {
    el.cookieCount.textContent = formatCookies(cookies);
    el.upgradeButton.textContent = `Upgrade (${formatCookies(upgradeCost)})`;
    el.cookieLabel.textContent = cookieName;
}

function saveGame() {
    setCookie("cookies", cookies, 7);
    setCookie("cookiesPerClick", cookiesPerClick, 7);
    setCookie("upgradeCost", upgradeCost, 7);
    localStorage.setItem("cookieName", cookieName);
}

function loadGame() {
    cookies = parseFloat(getCookie("cookies")) || 0;
    cookiesPerClick = parseFloat(getCookie("cookiesPerClick")) || 1;
    upgradeCost = parseFloat(getCookie("upgradeCost")) || 10;
    const savedName = localStorage.getItem("cookieName");
    if (savedName) {
        cookieName = savedName;
        el.cookieNameInput.value = savedName;
    }
    updateUI();
}

function resetGame() {
    document.cookie.split(";").forEach(c => {
        document.cookie = c.split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
    });
    localStorage.removeItem("buttonImage");
    localStorage.removeItem("cookieName");
    el.cookieButton.src = "";
    document.querySelector("link[rel*='icon']")?.remove();
    location.reload();
}

// === Image Stuff ===
function saveFavicon(dataUrl) {
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/x-icon";
        document.head.appendChild(link);
    }
    link.href = dataUrl;
}

function loadButtonImage() {
    const dataUrl = localStorage.getItem("buttonImage");
    if (dataUrl) {
        el.cookieButton.src = dataUrl;
        saveFavicon(dataUrl);
    }
}

// === Event Handlers ===
el.cookieButton.addEventListener("click", () => {
    cookies += cookiesPerClick;
    updateUI();
    saveGame();
});

el.upgradeButton.addEventListener("click", () => {
    if (cookies >= upgradeCost) {
        cookies -= upgradeCost;
        cookiesPerClick *= 2;
        upgradeCost = Math.ceil(upgradeCost * 1.25);
        showToast(`Cookies per click upgraded! \n${formatCookies(cookiesPerClick)}`);
    } else {
        showToast(`Not enough cookies! Need \n${formatCookies(upgradeCost)} Cookies`);
    }
    updateUI();
    saveGame();
});

el.resetButton.addEventListener("click", resetGame);
el.openWindow.addEventListener("click", () => el.popup.style.display = "flex");
el.closeButton.addEventListener("click", () => el.popup.style.display = "none");

el.uploadImage.addEventListener("change", function() {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        const dataUrl = e.target.result;
        el.cookieButton.src = dataUrl;
        saveFavicon(dataUrl);
        localStorage.setItem("buttonImage", dataUrl);
    };
    reader.readAsDataURL(file);
});

el.cookieNameInput.addEventListener("input", () => {
    cookieName = el.cookieNameInput.value.trim() || "Cookies";
    el.cookieLabel.textContent = cookieName;
    localStorage.setItem("cookieName", cookieName);
});

// === Init ===
window.onload = () => {
    el.toastContainer = document.getElementById("toast-container");
    loadButtonImage();
    loadGame();
};
