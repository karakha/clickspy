let cookies = 0;
let cookiesPerClick = 1;
let upgradeCost = 10;

// Get elements
const cookieButton = document.getElementById("cookieButton");
const cookieCount = document.getElementById("cookieCount");
const upgradeButton = document.getElementById("upgradeButton");

function formatCookies(num) {
    const suffixes = [
        { value: 1e3, suffix: "K" }, // Thousand
        { value: 1e6, suffix: "M" }, // Million
        { value: 1e9, suffix: "B" }, // Billion
        { value: 1e12, suffix: "T" }, // Trillion
        { value: 1e15, suffix: "P" }, // Quadrillion
        { value: 1e18, suffix: "E" }, // Quintillion
        { value: 1e21, suffix: "Z" }, // Sextillion
        { value: 1e24, suffix: "Y" }, // Septillion
        { value: 1e27, suffix: "O" }, // Octillion
        { value: 1e30, suffix: "N" }, // Nonillion
        { value: 1e33, suffix: "D" }, // Decillion
        { value: 1e36, suffix: "U" }, // Undecillion
        { value: 1e39, suffix: "D2" }, // Duodecillion
        { value: 1e42, suffix: "T2" }, // Tredecillion
        { value: 1e45, suffix: "Q2" }, // Quattuordecillion
        { value: 1e48, suffix: "Q3" }, // Quindecillion
        { value: 1e51, suffix: "S" }, // Sexdecillion
        { value: 1e54, suffix: "S2" }, // Septendecillion
        { value: 1e57, suffix: "O2" }, // Octodecillion
        { value: 1e60, suffix: "N2" }, // Novemdecillion
        { value: 1e63, suffix: "D3" }, // Vigintillion
        { value: 1e66, suffix: "U2" }, // Unvigintillion
        { value: 1e69, suffix: "D4" }, // Trigintillion
        { value: 1e72, suffix: "T3" }, // Quadragintillion
        { value: 1e75, suffix: "Q4" }, // Quinquagintillion
        { value: 1e78, suffix: "S3" }, // Sexagintillion
        { value: 1e81, suffix: "S4" }, // Septuagintillion
        { value: 1e84, suffix: "O3" }, // Octogintillion
        { value: 1e87, suffix: "N3" }, // Nonagintillion
        { value: 1e90, suffix: "D5" }, // Centillion
        { value: 1e93, suffix: "U3" }, // Uncentillion
        { value: 1e96, suffix: "D6" }, // Duocentillion
        { value: 1e99, suffix: "T4" }, // Trecentillion
        { value: 1e102, suffix: "Q5" }, // Quattuorcentillion
        { value: 1e105, suffix: "Q6" }, // Quinquacentillion
        { value: 1e108, suffix: "S5" }, // Sexcentillion
        { value: 1e111, suffix: "S6" }, // Septencentillion
        { value: 1e114, suffix: "O4" }, // Octocentillion
        { value: 1e117, suffix: "N4" }, // Nonacentillion
        { value: 1e120, suffix: "D7" }, // Decacentillion
        { value: 1e123, suffix: "U4" }, // Undecacentillion
        { value: 1e126, suffix: "D8" }, // Duodecacentillion
        { value: 1e129, suffix: "T5" }, // Tredecacentillion    
        { value: 1e132, suffix: "Q7" }, // Quattuordecacentillion
        { value: 1e135, suffix: "Q8" }, // Quinquadecacentillion
        { value: 1e138, suffix: "S7" }, // Sexdecacentillion
        { value: 1e141, suffix: "S8" }, // Septendecacentillion
        { value: 1e144, suffix: "O5" }, // Octodecacentillion
        { value: 1e147, suffix: "N5" }, // Novemdecacentillion
        { value: 1e150, suffix: "D9" }, // Vigintacentillion
        { value: 1e153, suffix: "U5" }, // Unvigintacentillion
        { value: 1e156, suffix: "D10" }, // Trigintacentillion
        { value: 1e159, suffix: "T6" }, // Quadragintacentillion
        { value: 1e162, suffix: "Q9" }, // Quinquagintacentillion
        { value: 1e165, suffix: "S9" }, // Sexagintacentillion
        { value: 1e168, suffix: "S10" }, // Septuagintacentillion
        { value: 1e171, suffix: "O6" }, // Octogintacentillion
        { value: 1e174, suffix: "N6" }, // Nonagintacentillion
        { value: 1e177, suffix: "D11" }, // Centicentillion
        { value: 1e180, suffix: "U6" }, // Uncenticentillion
        { value: 1e183, suffix: "D12" }, // Duocenticentillion
        { value: 1e186, suffix: "T7" }, // Trecenticentillion
        { value: 1e189, suffix: "Q10" }, // Quattuorcenticentillion
        { value: 1e192, suffix: "Q11" }, // Quinquacenticentillion
        { value: 1e195, suffix: "S11" }, // Sexcenticentillion
        { value: 1e198, suffix: "S12" }, // Septencenticentillion
        { value: 1e201, suffix: "O7" }, // Octocenticentillion
        { value: 1e204, suffix: "N7" }, // Nonacenticentillion
        { value: 1e207, suffix: "D13" }, // Decacenticentillion
        { value: 1e210, suffix: "U7" }, // Undecacenticentillion
        { value: 1e213, suffix: "D14" }, // Duodecacenticentillion
        { value: 1e216, suffix: "T8" }, // Tredecacenticentillion
        { value: 1e219, suffix: "Q12" }, // Quattuordecacenticentillion
        { value: 1e222, suffix: "Q13" }, // Quinquadecacenticentillion
        { value: 1e225, suffix: "S13" }, // Sexdecacenticentillion
        { value: 1e228, suffix: "S14" }, // Septendecacenticentillion
        { value: 1e231, suffix: "O8" }, // Octodecacenticentillion
        { value: 1e234, suffix: "N8" }, // Novemdecacenticentillion
        { value: 1e237, suffix: "D15" }, // Vigintacenticentillion
        { value: 1e240, suffix: "U8" }, // Unvigintacenticentillion
        { value: 1e243, suffix: "D16" }, // Trigintacenticentillion
        { value: 1e246, suffix: "T9" }, // Quadragintacenticentillion
        { value: 1e249, suffix: "Q14" }, // Quinquagintacenticentillion
        { value: 1e252, suffix: "S15" }, // Sexagintacenticentillion
        { value: 1e255, suffix: "S16" }, // Septuagintacenticentillion
        { value: 1e258, suffix: "O9" }, // Octogintacenticentillion
        { value: 1e261, suffix: "N9" }, // Nonagintacenticentillion
        { value: 1e264, suffix: "D17" }, // Centicentacentillion
        { value: 1e267, suffix: "U9" }, // Uncenticentacentillion
        { value: 1e270, suffix: "D18" }, // Duocenticentacentillion
        { value: 1e273, suffix: "T10" }, // Trecenticentacentillion
        { value: 1e276, suffix: "Q15" }, // Quattuorcenticentacentillion
        { value: 1e279, suffix: "Q16" }, // Quinquacenticentacentillion
        { value: 1e282, suffix: "S17" }, // Sexcenticentacentillion
        { value: 1e285, suffix: "S18" }, // Septencenticentacentillion
        { value: 1e288, suffix: "O10" }, // Octocenticentacentillion
        { value: 1e291, suffix: "N10" }, // Nonacenticentacentillion

        // Extend this further if needed...
    ];

    for (let i = suffixes.length - 1; i >= 0; i--) {
        if (num >= suffixes[i].value) {
            return (num / suffixes[i].value).toFixed(2) + suffixes[i].suffix;
        }
    }

    return num.toLocaleString(); // Fallback for smaller numbers
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

// Call this function when the page loads to load saved game state
loadGameState();

// Save game state whenever cookies change
cookieButton.addEventListener("click", function() {
    cookies += cookiesPerClick; // Increase cookies by cookies per click
    cookieCount.textContent = formatCookies(cookies);
    setCookie("cookies", cookies, 7);  // Save cookies for 7 days
    setCookie("cookiesPerClick", cookiesPerClick, 7);  // Save cookies per click for 7 days
});

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
function isMobileView() {
    return window.innerWidth <= 768;
}

function showToast(message) {
    // Remove any existing toast
    const existing = document.querySelector('.toast, .toast-mobile');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    const isMobile = isMobileView();

    toast.className = isMobile ? 'toast-mobile' : 'toast';
    toast.textContent = message;

    if (isMobile) {
        document.body.appendChild(toast);
    } else {
        const container = document.getElementById('toast-container');
        container.appendChild(toast);
    }

    setTimeout(() => toast.remove(), 3000);
}

