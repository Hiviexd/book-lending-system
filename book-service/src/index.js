require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = process.env.BOOK_SERVICE_PORT || 3002;

app.use(express.json());
app.use("/books", bookRoutes);

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Book service running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
