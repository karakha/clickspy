
let cookies = 0;
let cookiesPerClick = 1;
let upgradeCost = 10;
let cookieName = "Cookies"; // Default name

// Get elements
const cookieButton = document.getElementById("cookieButton");
const cookieCount = document.getElementById("cookieCount");
const upgradeButton = document.getElementById("upgradeButton");
const openWindow = document.getElementById("openWindow");
const popup = document.getElementById("popupWindow");
const closeButton = document.querySelector("#popupWindow button");
const resetButton = document.querySelector('.popupSettings button');
const popupWindow = document.getElementById('popupWindow');
const uploadButtonImage = document.getElementById('uploadButtonImage');
const cookieLabel = document.getElementById("cookieLabel");
const cookieNameInput = document.getElementById("cookieNameInput");

// Detect if running below 768 width
function isMobileView() {
    return window.innerWidth <= 768;
}

// Function to set cookies
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000)); // expires in 'days'
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Function to get cookies
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Upgrade button logic
upgradeButton.addEventListener("click", function() {
    if (cookies >= upgradeCost) {
        cookies -= upgradeCost;
        setCookie("cookies", cookies, 7);  // Save cookies after upgrade

        // Delayed update to reflect the change correctly
        setTimeout(() => {
            cookieCount.textContent = formatCookies(cookies); // Now this should show the correct amount

            cookiesPerClick *= 2;
            setCookie("cookiesPerClick", cookiesPerClick, 7); // Save cookies per click after upgrade
            showToast("Upgrade bought! Cookies per click: \n" + formatCookies(cookiesPerClick));

            upgradeCost = Math.ceil(upgradeCost * 1.25);
            setCookie("upgradeCost", upgradeCost, 7); // Save upgrade cost after upgrade
            upgradeButton.textContent = `Upgrade (${formatCookies(upgradeCost)} Cookies)`;
        }, 0); // Wait until the current call stack is empty to update the UI
    } else {
        showToast("Not enough cookies! Need \n" + formatCookies(upgradeCost));
    }
});

// Toasting System
function showToast(message) {
    // Remove any existing toast
    const existing = document.querySelector('.toast, .toast-mobile');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    const isMobile = isMobileView();

    toast.className = isMobile ? 'toast-mobile' : 'toast';
    toast.textContent = message;

    // Append toast based on the device type
    if (isMobile) {
        document.body.appendChild(toast); // Directly append to body for mobile view
    } else {
        const container = document.getElementById('toast-container');
        container.appendChild(toast); // Ensure the container exists before appending
    }
    setTimeout(() => toast.remove(), 3000); // Remove after 3 seconds
}

// Event listener for reset button
resetButton.addEventListener('click', resetProgress);

function resetProgress() {
    // Delete all cookies
    document.cookie.split(";").forEach(function(cookie) {
        let cookieName = cookie.split("=")[0];
        document.cookie = cookieName + "=;expires=" + new Date(0).toUTCString() + ";path=/";
    });

    // Clear custom image and favicon
    cookieButton.src = ''; // Reset cookie button image
    const link = document.querySelector("link[rel*='icon']");
    if (link) {
        link.href = ''; // Reset the favicon
    }

    // Delete the saved image from localStorage
    localStorage.removeItem('buttonImage');

    // Reload the page
    location.reload();
}

// Save game state whenever cookies change
cookieButton.addEventListener("click", function() {
    cookies += cookiesPerClick; // Increase cookies by cookies per click
    cookieCount.textContent = formatCookies(cookies);
    setCookie("cookies", cookies, 7);  // Save cookies for 7 days
    setCookie("cookiesPerClick", cookiesPerClick, 7);  // Save cookies per click for 7 days
});
// Function to update local storage when cookie count changes
function updateCookieCountInStorage() {
    localStorage.setItem('cookieCount', cookieCount.textContent);   
}

// Initialize MutationObserver
const observer = new MutationObserver(updateCookieCountInStorage);

// Configuration of the observer (observe changes in child nodes or text content)
const config = { childList: true, subtree: true };

// Start observing the cookieCountDisplay element for changes
observer.observe(cookieCount, config);

// Window Logic
openWindow.addEventListener("click", () => {
    popup.style.display = "flex";
});

closeButton.addEventListener("click", () => {
    popup.style.display = "none";
});
uploadButtonImage.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataUrl = e.target.result;

            // Update the cookie button image
            cookieButton.src = dataUrl;

            // Update the favicon with the selected image
            saveFavicon(dataUrl);

            // Save the image as a cookie
            saveButtonImage(dataUrl);
        };
        reader.readAsDataURL(file);
    }
});

function saveButtonImage(dataUrl) {
    // Save button image to localStorage
    localStorage.setItem('buttonImage', dataUrl);
}

function saveFavicon(dataUrl) {
    // Update the favicon with the same image
    const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "icon";
    link.href = dataUrl;

    // Append the link element to the head if not already there
    if (!document.querySelector("link[rel*='icon']")) {
        document.head.appendChild(link);
    }
}

function loadButtonImage() {
    const dataUrl = localStorage.getItem('buttonImage');
    if (dataUrl) {
        // Load the button image from localStorage
        cookieButton.src = dataUrl;

        // Set the favicon to the saved button image
        saveFavicon(dataUrl);
    }
}

// Function to check and load game state from cookies
function loadGameState() {
    const savedCookies = getCookie("cookies");
    const savedCookiesPerClick = getCookie("cookiesPerClick");
    const savedUpgradeCost = getCookie("upgradeCost");

    if (savedCookies) cookies = parseFloat(savedCookies);
    if (savedCookiesPerClick) cookiesPerClick = parseFloat(savedCookiesPerClick);
    if (savedUpgradeCost) upgradeCost = parseFloat(savedUpgradeCost);

    // Update the UI
    cookieCount.textContent = formatCookies(cookies);
    upgradeButton.textContent = `Upgrade (Cost: ${formatCookies(upgradeCost)})`;
    const savedName = localStorage.getItem("cookieName");
if (savedName) {
    cookieName = savedName;
    cookieLabel.textContent = cookieName;
    cookieNameInput.value = savedName;
}

}

cookieNameInput.addEventListener("input", () => {
    cookieName = cookieNameInput.value.trim() || "Cookies";
    cookieLabel.textContent = cookieName;
    localStorage.setItem("cookieName", cookieName);
});

window.onload = () => {
    loadButtonImage();
    loadGameState(); // Optionally load other game state data
  };