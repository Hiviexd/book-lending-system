const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

let penaltyGrpcClient = null;

exports.initPenaltyGrpcClient = () => {
    const protoPath = path.join(__dirname, "../../proto/penalty.proto");
    const packageDefinition = protoLoader.loadSync(protoPath, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
    const penaltyProto = grpc.loadPackageDefinition(packageDefinition).penalty;
    penaltyGrpcClient = new penaltyProto.PenaltyService(
        process.env.PENALTY_GRPC_URL || "penalty-service:50051",
        grpc.credentials.createInsecure()
    );
};

exports.getPenaltyGrpcClient = () => penaltyGrpcClient;
