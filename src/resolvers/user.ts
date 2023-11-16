import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const UserResolvers = {
  Query: {
    users() {
      return prisma.user.findMany()
    },

    user(parent: unknown, args: { id: string }) {
      return prisma.user.findUnique({
        where: { id: args.id },
      })
    },

    userByEmail(parent: unknown, args: { email: string }) {
      return prisma.user.findUnique({
        where: { email: args.email },
      })
    },
  },

  Mutation: {
    createUser(
      parent: unknown,
      args: { email: string; firstName: string; lastName: string }
    ) {
      return prisma.user.create({
        data: {
          email: args.email,
          firstName: args.firstName,
          lastName: args.lastName,
        },
      })
    },

    updateUser(
      parent: unknown,
      args: { id: string; firstName: string; lastName: string }
    ) {
      return prisma.user.update({
        where: { id: args.id },
        data: {
          firstName: args.firstName,
          lastName: args.lastName,
        },
      })
    },

    deleteUser(parent: unknown, args: { id: string }) {
      return prisma.user.delete({
        where: { id: args.id },
      })
    },
  },
}
