const express = require("express");
const router = express.Router();
const { proxyRequest } = require("../utils/httpClient");
const services = require("../config/services");

/**
 * Proxy all user service routes
 * /api/users/* -> user-service:3001/*
 */
router.all("/*", async (req, res, next) => {
    try {
        // req.path is already stripped of /api/users prefix by Express
        // User service routes: /register, /login, /profile
        const path = req.path || "/";
        const response = await proxyRequest(req, services.userService, path);

        res.status(response.status).json(response.data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

