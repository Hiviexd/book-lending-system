require("dotenv").config();
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const { calculatePenalty } = require("../penalty/calculate");

const PROTO_PATH = path.join(__dirname, "proto/penalty.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const penaltyProto = grpc.loadPackageDefinition(packageDefinition).penalty;

function CalculatePenalty(call, callback) {
    const { daysLate } = call.request;
    const penalty = calculatePenalty(daysLate);
    callback(null, { penalty });
}

function main() {
    const server = new grpc.Server();
    server.addService(penaltyProto.PenaltyService.service, { CalculatePenalty });
    const port = process.env.gRPC_PORT || "50051";
    server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`Penalty gRPC server running on port ${port}`);
        server.start();
    });
}

main();
