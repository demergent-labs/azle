// TODO once we have dfx 0.16.x working reenable these tests in CI

import { Server } from 'azle';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: String
    title: String
    rating: Int
  }

  type Author {
    id: String
    name: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    authors: [Author]
    titles: [String]
  }

  type Mutation {
    createBook(title: String!, rating: Int!): Book
  }
`;

let books = [
    {
        id: '0',
        title: 'The Awakening',
        rating: 34
    },
    {
        id: '1',
        title: 'City of Glass',
        rating: 63
    }
];

const authors = [
    {
        id: '0',
        name: 'Jordan'
    },
    {
        id: '1',
        name: 'Ben'
    }
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
        authors: () => authors,
        titles: () => {
            return books.map((book) => book.title);
        }
    },
    Mutation: {
        createBook: (parent: any, args: any) => {
            const book = {
                id: books.length.toString(),
                title: args.title,
                rating: args.rating
            };

            books = [...books, book];

            return book;
        }
    }
};

export default Server(async () => {
    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start();

    app.use(express.json({ limit: '50mb' }), expressMiddleware(server, {}));

    return app.listen();
});
