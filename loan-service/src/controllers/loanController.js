const Loan = require("../models/Loan");
const { publishLoanEvent } = require("../kafka/producer");
const { getPenaltyGrpcClient } = require("../services/penaltyGrpcClient");

exports.borrowBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        if (!userId || !bookId) {
            return res.status(400).json({ message: "userId and bookId are required" });
        }
        const loan = new Loan({ userId, bookId });
        await loan.save();
        await publishLoanEvent({ type: "BORROW", userId, bookId, loanId: loan._id });
        const plainLoan = loan.toObject();
        plainLoan._id = loan._id.toString();
        res.status(201).json(plainLoan);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        if (!userId || !bookId) {
            return res.status(400).json({ message: "userId and bookId are required" });
        }
        const loan = await Loan.findOne({ userId, bookId, returnedAt: { $exists: false } });
        if (!loan) return res.status(404).json({ message: "Active loan not found" });
        loan.returnedAt = new Date();
        // Calculate penalty if late
        let penalty = 0;
        const dueDate = new Date(loan.borrowedAt);
        dueDate.setDate(dueDate.getDate() + 14); // 2 weeks loan period
        if (loan.returnedAt > dueDate) {
            const daysLate = Math.ceil((loan.returnedAt - dueDate) / (1000 * 60 * 60 * 24));
            const penaltyGrpcClient = getPenaltyGrpcClient();
            if (!penaltyGrpcClient) {
                return res.status(500).json({ message: "gRPC client not initialized" });
            }
            penaltyGrpcClient.CalculatePenalty({ daysLate }, (err, response) => {
                if (err) {
                    loan.penalty = 0;
                } else {
                    loan.penalty = response.penalty;
                }
                loan.save();
                publishLoanEvent({ type: "RETURN", userId, bookId, loanId: loan._id, penalty: loan.penalty });
                const plainLoan = loan.toObject();
                plainLoan._id = loan._id.toString();
                res.json(plainLoan);
            });
        } else {
            loan.penalty = 0;
            await loan.save();
            await publishLoanEvent({ type: "RETURN", userId, bookId, loanId: loan._id, penalty: 0 });
            const plainLoan = loan.toObject();
            plainLoan._id = loan._id.toString();
            res.json(plainLoan);
        }
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getUserLoans = async (req, res) => {
    try {
        const { userId } = req.params;
        const loans = await Loan.find({ userId }).lean();
        res.json(loans.map((loan) => ({ ...loan, _id: loan._id.toString() })));
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
