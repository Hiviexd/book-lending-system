#!/bin/bash

# Wait for Kafka to be ready
sleep 10

# Create loan-events topic
kafka-topics.sh --create --topic loan-events --bootstrap-server kafka:9092 --replication-factor 1 --partitions 1 || true
