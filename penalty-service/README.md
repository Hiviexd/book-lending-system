# Penalty Service

Calculates penalties for late book returns via gRPC.

## Purpose
- Provide penalty calculation for late book returns
- Expose a gRPC server for other services

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

## gRPC Methods
- `CalculatePenalty` — Calculates penalty based on days late and daily rate

## Environment Variables
- `gRPC_PORT` — Port to run the gRPC server
- `PENALTY_DAILY_RATE` — Daily penalty rate
