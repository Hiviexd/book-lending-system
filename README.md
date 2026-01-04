# Book Lending System Backend

A microservices-based backend system for managing users, books, loans, and late return penalties. Demonstrates REST, GraphQL, gRPC, and Kafka. No frontend — testable via Postman.

## Technologies used

<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Apache Kafka-231F20?logo=apachekafka&logoColor=white" />
  <img src="https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=white" />
  <img src="https://img.shields.io/badge/gRPC-5C7AEA?logo=grpc&logoColor=white" />
  <img src="https://img.shields.io/badge/REST-000000?logo=rest&logoColor=white" />
</p>

## Architecture

- **api-gateway**: Root gateway service - unified entry point for all operations (Port 5000)
- **user-service**: User registration and management (REST)
- **book-service**: Book catalog and availability (REST)
- **loan-service**: Borrow/return books, emits loan events (REST, Kafka, gRPC client)
- **penalty-service**: Calculates late return penalties (gRPC server)
- **graphql-gateway**: Unified GraphQL API
- **Kafka**: Event streaming for loan events
- **MongoDB Atlas**: Database for all services

```
[Postman] <-> [API Gateway:5000] <-> [user/book/loan services] <-> [MongoDB]
                |                        |
                +-> [GraphQL Gateway]    +--> [penalty-service (gRPC)]
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
   - All requests should go through the API Gateway at `http://localhost:5000`
   - Use `/api/users/*`, `/api/books/*`, `/api/loans/*` for REST endpoints
   - Use `/api/graphql` for GraphQL queries

## Services
Each service has its own README for details, endpoints, and setup.

- [api-gateway](./api-gateway/README.md) - **Start here!** Single entry point for all operations
- [user-service](./user-service/README.md)
- [book-service](./book-service/README.md)
- [loan-service](./loan-service/README.md)
- [penalty-service](./penalty-service/README.md)
- [graphql-gateway](./graphql-gateway/README.md)

## Testing
- Use the provided Postman collection to test all endpoints and flows.
- For testing Kafka events, run Kafdrop via `docker run -d -p 9000:9000 -e KAFKA_BROKER_CONNECT=kafka:9092 --network=book-lending-system_default obsidiandynamics/kafdrop` and access at `http://localhost:9000`; events will appear in the `loan-events` topic.
