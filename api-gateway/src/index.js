require("dotenv").config();
const express = require("express");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const loanRoutes = require("./routes/loanRoutes");
const graphqlProxy = require("./routes/graphqlProxy");

const app = express();
const PORT = process.env.GATEWAY_PORT || 5000;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Handle body parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ message: "Invalid JSON in request body" });
    }
    next(err);
});

app.use(logger);

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "ok", service: "api-gateway" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api", graphqlProxy);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
    console.log(`Routes:`);
    console.log(`  - /api/users/* -> User Service`);
    console.log(`  - /api/books/* -> Book Service`);
    console.log(`  - /api/loans/* -> Loan Service`);
    console.log(`  - /api/graphql -> GraphQL Gateway`);
});
