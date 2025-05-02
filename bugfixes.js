// === bugfixes.js ===

// Cap just below JavaScript's numeric limit to avoid Infinity
const MAX_COOKIES = 1e308;

// Patch the global formatCookies if it exists
if (typeof formatCookies === "function") {
    const originalFormatCookies = formatCookies;

    window.formatCookies = function(num) {
        if (!isFinite(num)) return "∞";  // Infinity patch
        if (num >= MAX_COOKIES) return "dafaq?";  // Soft cap display

        const tier = Math.floor(Math.log10(num) / 3);
        const n10Tier = 105; // Index of "N10" in your suffixes array

        if (tier > n10Tier) {
            console.log("Beyond N10. Sanity check failed. Proceeding anyway.");
        }

        return originalFormatCookies(num);
    };
}
