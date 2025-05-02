function formatCookies(num) {
    const suffixes = [
        "", "K", "M", "B", "T", "P", "E", "Z", "Y", "O", "N", "D", "U", "D2", "T2", "Q2", "Q3", "S", "S2", "O2", "N2", "D3", "U2", "D4", "T3", "Q4", 
        "S3", "S4", "O3", "N3", "D5", "U3", "D6", "T4", "Q5", "Q6", "S5", "S6", "O4", "N4", "D7", "U4", "D8", "T5", "Q7", "Q8", "S7", "S8", "O5", 
        "N5", "D9", "U5", "D10", "T6", "Q9", "S9", "S10", "O6", "N6", "D11", "U6", "D12", "T7", "Q10", "Q11", "S11", "S12", "O7", "N7", "D13", 
        "U7", "D14", "T8", "Q12", "Q13", "S13", "S14", "O8", "N8", "D15", "U8", "D16", "T9", "Q14", "S15", "S16", "O9", "N9", "D17", "U9", "D18", 
        "T10", "Q15", "Q16", "S17", "S18", "O10", "N10"
    ];

    // If the number is small enough, return it as is
    if (num < 1000) return num.toLocaleString();

    // Find which tier (suffix) the number falls into
    let tier = Math.floor(Math.log10(num) / 3);

    // Apply the appropriate suffix
    const suffix = suffixes[tier];
    const scaled = num / Math.pow(1000, tier);
    return scaled.toFixed(2) + suffix;
}
