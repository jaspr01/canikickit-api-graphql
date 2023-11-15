import gql from 'graphql-tag'

export const UserTypeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    createdAt: Date!
    updatedAt: Date!
  }

  extend type Query {
    user(id: ID!): User
    users: [User]
  }

  extend type Mutation {
    createUser(email: String!, firstName: String!, lastName: String!): User!
  }
`
