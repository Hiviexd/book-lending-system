const axios = require("axios");
const services = require("../config/services");

/**
 * Creates an axios instance with default configuration
 */
const createClient = (baseURL) => {
    return axios.create({
        baseURL,
        timeout: services.requestTimeout,
        headers: {
            "Content-Type": "application/json",
        },
    });
};

/**
 * Filters headers to remove connection-specific headers that shouldn't be forwarded
 */
const filterHeaders = (headers) => {
    const filtered = { ...headers };

    // Remove headers that shouldn't be forwarded
    delete filtered.host;
    delete filtered.connection;
    delete filtered["content-length"]; // Let axios calculate this
    delete filtered["transfer-encoding"];
    delete filtered["upgrade"];
    delete filtered["keep-alive"];

    // Preserve important headers
    return filtered;
};

/**
 * Proxies a request to a target service
 * @param {Object} req - Express request object
 * @param {string} targetUrl - Full target URL
 * @param {string} path - Optional path override
 * @returns {Promise} Axios response
 */
const proxyRequest = async (req, targetUrl, path = null) => {
    const client = axios.create({
        timeout: services.requestTimeout,
    });

    const url = path ? `${targetUrl}${path}` : `${targetUrl}${req.path}`;

    const config = {
        method: req.method,
        url,
        headers: filterHeaders(req.headers),
        params: req.query,
    };

    // Include body for methods that support it
    const methodsWithBody = ["POST", "PUT", "PATCH"];
    if (methodsWithBody.includes(req.method.toUpperCase())) {
        // Include body if it exists (express.json() may set it to {} for empty requests)
        // Only send if original request had Content-Type indicating a body
        const contentType = req.headers["content-type"] || "";
        if (
            contentType &&
            (contentType.includes("application/json") || contentType.includes("application/x-www-form-urlencoded"))
        ) {
            if (req.body !== undefined) {
                config.data = req.body;
            }
        }
    }

    try {
        const response = await client.request(config);
        return response;
    } catch (error) {
        if (error.response) {
            // Service responded with error status
            throw {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
            };
        } else if (error.request) {
            // Request made but no response
            throw {
                status: 503,
                data: { message: "Service unavailable", error: "No response from service" },
            };
        } else {
            // Error setting up request
            throw {
                status: 500,
                data: { message: "Gateway error", error: error.message },
            };
        }
    }
};

module.exports = {
    createClient,
    proxyRequest,
};
