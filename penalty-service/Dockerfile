FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile || yarn install
COPY . .
EXPOSE 50051
CMD ["yarn", "start"]
