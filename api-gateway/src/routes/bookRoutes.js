const express = require("express");
const router = express.Router();
const { proxyRequest } = require("../utils/httpClient");
const services = require("../config/services");

/**
 * Proxy all book service routes
 * /api/books/* -> book-service:3002/books/*
 */
router.all("/*", async (req, res, next) => {
    try {
        // req.path is already stripped of /api/books prefix by Express
        // Book service expects: /books, /books/:id
        // req.path will be "/" or "/:id", so prepend "/books"
        let path = `/books`;
        if (req.path && req.path !== "/") {
            path += req.path;
        }
        const response = await proxyRequest(req, services.bookService, path);

        res.status(response.status).json(response.data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

