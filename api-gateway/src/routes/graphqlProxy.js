const express = require("express");
const router = express.Router();
const { proxyRequest } = require("../utils/httpClient");
const services = require("../config/services");

/**
 * Proxy GraphQL requests to the GraphQL gateway
 * /api/graphql -> graphql-gateway:4000/graphql
 */
router.post("/graphql", async (req, res, next) => {
    try {
        const response = await proxyRequest(req, services.graphqlGateway, "/graphql");

        res.status(response.status).json(response.data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

