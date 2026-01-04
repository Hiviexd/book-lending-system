const express = require("express");
const router = express.Router();
const { proxyRequest } = require("../utils/httpClient");
const services = require("../config/services");

/**
 * Proxy all loan service routes
 * /api/loans/* -> loan-service:3003/loans/*
 */
router.all("/*", async (req, res, next) => {
    try {
        // req.path is already stripped of /api/loans prefix by Express
        // Loan service expects: /loans/borrow, /loans/return, /loans/user/:userId
        // req.path will be "/borrow", "/return", "/user/:userId", so prepend "/loans"
        const path = `/loans${req.path}`;
        const response = await proxyRequest(req, services.loanService, path);

        res.status(response.status).json(response.data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

