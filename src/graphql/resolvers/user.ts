import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const UserResolvers = {
  Query: {
    // TODO
  },

  Mutation: {
    createUser(parent, args) {
      return prisma.user.create({
        data: {
          email: args.email,
          firstName: args.firstName,
          lastName: args.lastName,
        },
      })
    },
  },
}
