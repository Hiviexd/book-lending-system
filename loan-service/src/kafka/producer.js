const { Kafka } = require("kafkajs");

let producer;
let topic = process.env.KAFKA_TOPIC_LOAN_EVENTS || "loan-events";

const kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKER || "kafka:9092"],
});

exports.initKafkaProducer = async () => {
    producer = kafka.producer();
    await producer.connect();
    console.log("Kafka producer connected");
};

exports.publishLoanEvent = async (event) => {
    if (!producer) return;
    await producer.send({
        topic,
        messages: [{ value: JSON.stringify(event) }],
    });
};
