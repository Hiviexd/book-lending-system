# User Service

Handles user registration, authentication, and profile management.

## Purpose
- Register new users
- Authenticate users (login)
- Manage user profiles

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
- `POST /register` — Register a new user
- `POST /login` — Authenticate user
- `GET /profile` — Get user profile (auth required)
- `PUT /profile` — Update user profile (auth required)

## Environment Variables
- `MONGO_URI` — MongoDB connection string
- `USER_SERVICE_PORT` — Port to run the service
- `USER_JWT_SECRET` — JWT secret for authentication
