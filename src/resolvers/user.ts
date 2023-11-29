import { Arg, Query, Resolver } from 'type-graphql'
import { PrismaClient, User as UserModel } from '@prisma/client'
import { User } from 'types'

const prisma = new PrismaClient()

@Resolver(User)
class UserResolvers {
  @Query(() => [User])
  async users(): Promise<UserModel[]> {
    return prisma.user.findMany()
  }

  @Query(() => User)
  async user(@Arg('id') id: string): Promise<UserModel | null> {
    return prisma.user.findUnique({ where: { id } })
  }

  @Query(() => User)
  async userByEmail(@Arg('email') email: string): Promise<UserModel | null> {
    return prisma.user.findUnique({ where: { email } })
  }

  /*

  Mutation: {
    createUser(
      parent: unknown,
      args: Prisma.UserCreateInput
    ) {
      return prisma.user.create({
        data: args
      })
    },

    updateUser(
      parent: unknown,
      args: Prisma.UserUpda
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
  */
}

export default UserResolvers
