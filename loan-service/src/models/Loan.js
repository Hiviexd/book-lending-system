const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        bookId: { type: String, required: true },
        borrowedAt: { type: Date, default: Date.now },
        returnedAt: { type: Date },
        penalty: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Loan", loanSchema);
