const axios = require("axios");

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://user-service:3001";
const BOOK_SERVICE_URL = process.env.BOOK_SERVICE_URL || "http://book-service:3002";
const LOAN_SERVICE_URL = process.env.LOAN_SERVICE_URL || "http://loan-service:3003";

module.exports = {
    Query: {
        users: async (_, __, context) => {
            try {
                // Optionally, pass JWT from context.headers if available
                const res = await axios.get(`${USER_SERVICE_URL}/profile`, {
                    headers:
                        context && context.headers && context.headers.authorization
                            ? { Authorization: context.headers.authorization }
                            : {},
                });
                return [res.data];
            } catch (err) {
                return [];
            }
        },
        books: async () => {
            try {
                const res = await axios.get(`${BOOK_SERVICE_URL}/books`);
                return res.data.map((book) => ({ ...book, id: book._id }));
            } catch (err) {
                return [];
            }
        },
        loans: async (_, { userId }) => {
            try {
                const res = await axios.get(`${LOAN_SERVICE_URL}/loans/user/${userId}`);
                return res.data.map((loan) => ({ ...loan, id: loan._id }));
            } catch (err) {
                return [];
            }
        },
        penalties: async (_, { userId }) => {
            try {
                const res = await axios.get(`${LOAN_SERVICE_URL}/loans/user/${userId}`);
                return res.data.filter((l) => l.penalty > 0).map((l) => ({ loanId: l._id, penalty: l.penalty }));
            } catch (err) {
                return [];
            }
        },
        userHistory: async (_, { userId }) => {
            try {
                const res = await axios.get(`${LOAN_SERVICE_URL}/loans/user/${userId}`);
                return res.data.map((loan) => ({ ...loan, id: loan._id }));
            } catch (err) {
                return [];
            }
        },
    },
};
