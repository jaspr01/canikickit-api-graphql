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
    deleteUser(id: ID!): User
    updateUser(id: ID!, firstName: String, lastName: String): User
  }
`;
const users = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com'
    }
];
export const resolvers = {
    Query: {
        users: () => users,
    },
};
