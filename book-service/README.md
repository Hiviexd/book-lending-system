# Book Service

Handles book catalog management and availability.

## Purpose
- Add, update, delete books
- List all books
- Check book availability

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
- `GET /books` — List all books
- `GET /books/:id` — Get book details
- `POST /books` — Add a new book
- `PUT /books/:id` — Update book info
- `DELETE /books/:id` — Remove a book

## Environment Variables
- `MONGO_URI` — MongoDB connection string
- `BOOK_SERVICE_PORT` — Port to run the service
