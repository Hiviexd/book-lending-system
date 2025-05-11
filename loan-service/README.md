# Loan Service

Handles borrowing and returning books, tracks loans, emits events, and calculates penalties.

## Purpose
- Borrow and return books
- Track loan records
- Publish loan events to Kafka
- Calculate late penalties via gRPC

## Setup
1. Copy `.env.example` to `.env` and fill in the values.
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Start the service:
   ```sh
   yarn start
   ```

## Endpoints (REST)
- `POST /loans/borrow` — Borrow a book
- `POST /loans/return` — Return a book
- `GET /loans/user/:userId` — Get user's loan history

## Kafka
- Publishes to topic: `loan-events`

## gRPC
- Calls `penalty-service` to calculate late return penalties

## Environment Variables
- `MONGO_URI` — MongoDB connection string
- `LOAN_SERVICE_PORT` — Port to run the service
- `KAFKA_BROKER` — Kafka broker address
- `KAFKA_TOPIC_LOAN_EVENTS` — Kafka topic for loan events
- `PENALTY_GRPC_URL` — gRPC URL for penalty service
