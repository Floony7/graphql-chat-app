import { createSchema } from "graphql-yoga";

const messages = [];

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      messages: [Message]
    }

    type Message {
      id: ID!
      user: String!
      content: String!
    }

    type Mutation {
      postMessage(user: String!, content: String!): ID!
    }
  `,
  resolvers: {
    Query: {
      messages: () => messages,
    },
    Mutation: {
      postMessage: (_, { user, content }) => {
        const id = messages.length;
        messages.push({
          id,
          user,
          content,
        });
        return id;
      },
    },
  },
});
