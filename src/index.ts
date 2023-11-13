import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

export const typeDefs = `#graphql
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!): User!
  }
`

const users = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com'
  }
]

export const resolvers = {
  Query: {
    users: () => users,
    user(parent, args, contextValue, info) {
      return users.find((user) => user.id === args.id);
    },
  },

  Mutation: {
    createUser(parent, args, contextValue, info) {
      const newUser = {
        id: String(users.length + 1),
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
      };

      users.push(newUser);

      return newUser;
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
