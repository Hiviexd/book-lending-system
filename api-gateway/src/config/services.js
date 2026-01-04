require("dotenv").config();

module.exports = {
    userService: process.env.USER_SERVICE_URL || "http://user-service:3001",
    bookService: process.env.BOOK_SERVICE_URL || "http://book-service:3002",
    loanService: process.env.LOAN_SERVICE_URL || "http://loan-service:3003",
    graphqlGateway: process.env.GRAPHQL_GATEWAY_URL || "http://graphql-gateway:4000",
    requestTimeout: parseInt(process.env.REQUEST_TIMEOUT) || 10000,
};

