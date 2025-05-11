# Book Lending System Backend

A microservices-based backend system for managing users, books, loans, and late return penalties. Demonstrates REST, GraphQL, gRPC, and Kafka. No frontend — testable via Postman.

## Architecture

- **user-service**: User registration and management (REST)
- **book-service**: Book catalog and availability (REST)
- **loan-service**: Borrow/return books, emits loan events (REST, Kafka, gRPC client)
- **penalty-service**: Calculates late return penalties (gRPC server)
- **graphql-gateway**: Unified GraphQL API
- **Kafka**: Event streaming for loan events
- **MongoDB Atlas**: Database for all services

```
[Postman] <-> [GraphQL Gateway] <-> [user/book/loan services] <-> [MongoDB]
                                 |
                                 +--> [penalty-service (gRPC)]
                                 +--> [Kafka (loan events)]
```

## Getting Started

1. **Clone the repo**
2. **Set up your `.env` files** (see `.env.example`)
3. **Start all services:**

```sh
docker-compose up --build
```

4. **Test with Postman** (collection provided in `/api/`)

## Services
- Each service has its own README for details, endpoints, and setup.

## Testing
- Use the provided Postman collection to test all endpoints and flows.
- For testing Kafka events, run Kafdrop via `docker run -d -p 9000:9000 -e KAFKA_BROKER_CONNECT=kafka:9092 --network=book-lending-system_default obsidiandynamics/kafdrop` and access at `http://localhost:9000`; events will appear in the `loan-events` topic.

---

**Tech:** Node.js, Express, MongoDB, Kafka, gRPC, GraphQL
