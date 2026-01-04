/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
    console.error(`Error in ${req.method} ${req.path}:`, err);

    const status = err.status || 500;
    const message = err.data?.message || err.message || "Internal server error";
    const error = err.data?.error || err.message;

    res.status(status).json({
        message,
        ...(process.env.NODE_ENV === "development" && { error, stack: err.stack }),
    });
};

module.exports = errorHandler;

