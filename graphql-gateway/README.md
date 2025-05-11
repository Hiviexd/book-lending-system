# GraphQL Gateway

Provides a unified GraphQL API for querying users, books, loans, and penalties.

## Purpose
- Aggregate data from all microservices
- Expose a single GraphQL endpoint for clients

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

## Endpoints
- `POST /graphql` — Main GraphQL endpoint

## Environment Variables
- `GQL_GATEWAY_PORT` — Port to run the gateway
