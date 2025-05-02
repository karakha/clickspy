// === bugfixes.js ===

// Max cap to avoid NaN/Infinity chaos
const MAX_COOKIES = 1e100;

// Patch the global formatCookies if it exists
if (typeof formatCookies === "function") {
    const originalFormatCookies = formatCookies;

    window.formatCookies = function(num) {
        if (!isFinite(num)) return "∞";  // Infinity patch
        if (num >= MAX_COOKIES) return "MAX";  // Optional soft cap display
        return originalFormatCookies(num);
    };
}
