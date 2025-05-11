require("dotenv").config();

const DAILY_RATE = parseFloat(process.env.PENALTY_DAILY_RATE) || 1;

function calculatePenalty(daysLate) {
    if (!daysLate || daysLate <= 0) return 0;
    return daysLate * DAILY_RATE;
}

module.exports = { calculatePenalty };
