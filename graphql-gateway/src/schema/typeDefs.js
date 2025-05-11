const { gql } = require("apollo-server-express");

module.exports = gql`
    type User {
        id: ID!
        username: String!
        email: String!
    }

    type Book {
        id: ID!
        title: String!
        author: String!
        isbn: String!
        available: Boolean!
    }

    type Loan {
        id: ID!
        userId: ID!
        bookId: ID!
        borrowedAt: String!
        returnedAt: String
        penalty: Float
    }

    type Penalty {
        loanId: ID!
        penalty: Float!
    }

    type Query {
        users: [User!]
        books: [Book!]
        loans: [Loan!]
        penalties: [Penalty!]
        userHistory(userId: ID!): [Loan!]
    }
`;
