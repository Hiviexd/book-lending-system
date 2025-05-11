require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./resolvers");

const app = express();
const PORT = process.env.GQL_GATEWAY_PORT || 4000;

async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });
    app.listen(PORT, () => {
        console.log(`GraphQL Gateway running at http://localhost:${PORT}/graphql`);
    });
}

startServer();
