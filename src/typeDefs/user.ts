import gql from 'graphql-tag'

export const UserTypeDefs = gql`
  type User @key(fields: "id") {
    id: String!
    email: String!
    firstName: String!
    lastName: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User]
    user(id: String!): User
    userByEmail(email: String!): User
  }

  type Mutation {
    createUser(email: String!, firstName: String!, lastName: String!): User!
    updateUser(id: String!, firstName: String, lastName: String): User!
    deleteUser(id: String!): User!
  }
`
