# API Gateway

The root API gateway service that provides a unified entry point for all microservices. All requests are routed through port 5000, eliminating the need to switch between different service ports.

## Purpose

- Single entry point for all API operations
- Route REST requests to appropriate microservices
- Proxy GraphQL requests to the GraphQL gateway
- Centralized request logging and error handling

## Architecture

```
Client → API Gateway (Port 5000)
         ├── /api/users/* → User Service (3001)
         ├── /api/books/* → Book Service (3002)
         ├── /api/loans/* → Loan Service (3003)
         └── /api/graphql → GraphQL Gateway (4000)
```

## Routes

### User Service Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/profile` - Update user profile (requires auth)

### Book Service Routes
- `GET /api/books` - List all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Add a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

### Loan Service Routes
- `POST /api/loans/borrow` - Borrow a book
- `POST /api/loans/return` - Return a book
- `GET /api/loans/user/:userId` - Get user's loans

### GraphQL Route
- `POST /api/graphql` - GraphQL endpoint (proxied to GraphQL gateway)

## Setup

1. Copy `.env.example` to `.env` and configure:
   ```sh
   cp .env.example .env
   ```

2. Install dependencies:
   ```sh
   yarn install
   ```

3. Start the service:
   ```sh
   yarn start
   # or for development
   yarn dev
   ```

## Environment Variables

- `GATEWAY_PORT` - Port to run the gateway (default: 5000)
- `USER_SERVICE_URL` - User service URL (default: http://user-service:3001)
- `BOOK_SERVICE_URL` - Book service URL (default: http://book-service:3002)
- `LOAN_SERVICE_URL` - Loan service URL (default: http://loan-service:3003)
- `GRAPHQL_GATEWAY_URL` - GraphQL gateway URL (default: http://graphql-gateway:4000)
- `REQUEST_TIMEOUT` - Request timeout in ms (default: 10000)
- `NODE_ENV` - Environment (development/production)

## Usage Examples

### Register a user
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"password123"}'
```

### Get all books
```bash
curl http://localhost:5000/api/books
```

### Borrow a book
```bash
curl -X POST http://localhost:5000/api/loans/borrow \
  -H "Content-Type: application/json" \
  -d '{"userId":"...","bookId":"..."}'
```

### GraphQL query
```bash
curl -X POST http://localhost:5000/api/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ books { id title author } }"}'
```

## Authentication

The gateway forwards the `Authorization` header to downstream services. Include the JWT token in your requests:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:5000/api/users/profile
```

## Health Check

```bash
curl http://localhost:5000/health
```

