require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const loanRoutes = require("./routes/loanRoutes");
const { initKafkaProducer } = require("./kafka/producer");
const { initPenaltyGrpcClient } = require("./services/penaltyGrpcClient");

const app = express();
const PORT = process.env.LOAN_SERVICE_PORT || 3003;

app.use(express.json());
app.use("/loans", loanRoutes);

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        console.log("Connected to MongoDB");
        await initKafkaProducer();
        initPenaltyGrpcClient();
        app.listen(PORT, () => {
            console.log(`Loan service running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
