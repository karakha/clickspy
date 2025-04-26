
let cookies = 0;
let cookiesPerClick = 1;
let upgradeCost = 10;

// Get elements
const cookieButton = document.getElementById("cookieButton");
const cookieCount = document.getElementById("cookieCount");
const upgradeButton = document.getElementById("upgradeButton");
const openWindow = document.getElementById("openWindow");
const popup = document.getElementById("popupWindow");
const closeButton = document.querySelector("#popupWindow button");
const cookieCountDisplay = document.getElementById('cookieCount');
const resetButton = document.querySelector('.popupSettings button');
const popupWindow = document.getElementById('popupWindow');
const uploadButtonImage = document.getElementById('uploadButtonImage');

// Detect if running below 768 width
function isMobileView() {
    return window.innerWidth <= 768;
}

// Event listener for the reset button
resetButton.addEventListener('click', resetProgress);

function formatCookies(num) {
    const suffixes = [
        { value: 1e3, suffix: "K" },
        { value: 1e6, suffix: "M" },
        { value: 1e9, suffix: "B" },
        { value: 1e12, suffix: "T" },
        { value: 1e15, suffix: "P" },
        { value: 1e18, suffix: "E" },
        { value: 1e21, suffix: "Z" },
        { value: 1e24, suffix: "Y" },
        { value: 1e27, suffix: "O" },
        { value: 1e30, suffix: "N" },
        { value: 1e33, suffix: "D" },
        { value: 1e36, suffix: "U" },
        { value: 1e39, suffix: "D2" },
        { value: 1e42, suffix: "T2" },
        { value: 1e45, suffix: "Q2" },
        { value: 1e48, suffix: "Q3" },
        { value: 1e51, suffix: "S" },
        { value: 1e54, suffix: "S2" },
        { value: 1e57, suffix: "O2" },
        { value: 1e60, suffix: "N2" },
        { value: 1e63, suffix: "D3" },
        { value: 1e66, suffix: "U2" },
        { value: 1e69, suffix: "D4" },
        { value: 1e72, suffix: "T3" },
        { value: 1e75, suffix: "Q4" },
        { value: 1e78, suffix: "S3" },
        { value: 1e81, suffix: "S4" },
        { value: 1e84, suffix: "O3" },
        { value: 1e87, suffix: "N3" },
        { value: 1e90, suffix: "D5" },
        { value: 1e93, suffix: "U3" },
        { value: 1e96, suffix: "D6" },
        { value: 1e99, suffix: "T4" },
        { value: 1e102, suffix: "Q5" },
        { value: 1e105, suffix: "Q6" },
        { value: 1e108, suffix: "S5" },
        { value: 1e111, suffix: "S6" },
        { value: 1e114, suffix: "O4" },
        { value: 1e117, suffix: "N4" },
        { value: 1e120, suffix: "D7" },
        { value: 1e123, suffix: "U4" },
        { value: 1e126, suffix: "D8" },
        { value: 1e129, suffix: "T5" },
        { value: 1e132, suffix: "Q7" },
        { value: 1e135, suffix: "Q8" },
        { value: 1e138, suffix: "S7" },
        { value: 1e141, suffix: "S8" },
        { value: 1e144, suffix: "O5" },
        { value: 1e147, suffix: "N5" },
        { value: 1e150, suffix: "D9" },
        { value: 1e153, suffix: "U5" },
        { value: 1e156, suffix: "D10" },
        { value: 1e159, suffix: "T6" },
        { value: 1e162, suffix: "Q9" },
        { value: 1e165, suffix: "S9" },
        { value: 1e168, suffix: "S10" },
        { value: 1e171, suffix: "O6" },
        { value: 1e174, suffix: "N6" },
        { value: 1e177, suffix: "D11" },
        { value: 1e180, suffix: "U6" },
        { value: 1e183, suffix: "D12" },
        { value: 1e186, suffix: "T7" },
        { value: 1e189, suffix: "Q10" },
        { value: 1e192, suffix: "Q11" },
        { value: 1e195, suffix: "S11" },
        { value: 1e198, suffix: "S12" },
        { value: 1e201, suffix: "O7" },
        { value: 1e204, suffix: "N7" },
        { value: 1e207, suffix: "D13" },
        { value: 1e210, suffix: "U7" },
        { value: 1e213, suffix: "D14" },
        { value: 1e216, suffix: "T8" },
        { value: 1e219, suffix: "Q12" },
        { value: 1e222, suffix: "Q13" },
        { value: 1e225, suffix: "S13" },
        { value: 1e228, suffix: "S14" },
        { value: 1e231, suffix: "O8" },
        { value: 1e234, suffix: "N8" },
        { value: 1e237, suffix: "D15" },
        { value: 1e240, suffix: "U8" },
        { value: 1e243, suffix: "D16" },
        { value: 1e246, suffix: "T9" },
        { value: 1e249, suffix: "Q14" },
        { value: 1e252, suffix: "S15" },
        { value: 1e255, suffix: "S16" },
        { value: 1e258, suffix: "O9" },
        { value: 1e261, suffix: "N9" },
        { value: 1e264, suffix: "D17" },
        { value: 1e267, suffix: "U9" },
        { value: 1e270, suffix: "D18" },
        { value: 1e273, suffix: "T10" },
        { value: 1e276, suffix: "Q15" },
        { value: 1e279, suffix: "Q16" },
        { value: 1e282, suffix: "S17" },
        { value: 1e285, suffix: "S18" },
        { value: 1e288, suffix: "O10" },
        { value: 1e291, suffix: "N10" }
    ];
    suffixes.reverse();
    
    for (const { value, suffix } of suffixes) {
        if (num >= value) {
            return (num / value).toFixed(2) + suffix;
        }
    }

    return num.toLocaleString();
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
            upgradeButton.textContent = `Upgrade (Cost: ${formatCookies(upgradeCost)})`;
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

    setTimeout(() => toast.remove(), 3000); // Remove after 3 seconds
}}

// Event listener for reset button
resetButton.addEventListener('click', resetProgress);

// Function to reset progress (delete all cookies and reload the page)
function resetProgress() {
    // Delete all cookies
    document.cookie.split(";").forEach(function(cookie) {
        let cookieName = cookie.split("=")[0];
        document.cookie = cookieName + "=;expires=" + new Date(0).toUTCString() + ";path=/";
    });

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
    localStorage.setItem('cookieCount', cookieCountDisplay.textContent);
}

// Initialize MutationObserver
const observer = new MutationObserver(updateCookieCountInStorage);

// Configuration of the observer (observe changes in child nodes or text content)
const config = { childList: true, subtree: true };

// Start observing the cookieCountDisplay element for changes
observer.observe(cookieCountDisplay, config);

// Optionally, disconnect the observer when it's no longer needed
// observer.disconnect();

// Window Logic
openWindow.addEventListener("click", () => {
    popup.style.display = "flex";
});

closeButton.addEventListener("click", () => {
    popup.style.display = "none";
});

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
}

window.onload = () => {
    loadButtonImage();
    loadGameState(); // Optionally load other game state data
    loadGameState();  // reads from document.cookie
    cookieCountDisplay.textContent = formatCookies(cookies);
  };