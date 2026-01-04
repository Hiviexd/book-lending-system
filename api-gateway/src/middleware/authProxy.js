/**
 * Authentication proxy middleware
 * Simply passes through the Authorization header to downstream services
 * No validation is performed here - let the services handle it
 */
const authProxy = (req, res, next) => {
    // Authorization header is already in req.headers
    // Just pass it through - no modification needed
    next();
};

module.exports = authProxy;

