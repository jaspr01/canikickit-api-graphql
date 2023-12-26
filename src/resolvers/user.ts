import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql'
import { PrismaClient, User as UserModel } from '@prisma/client'
import { User } from 'types'
import { CreateUserInput, GetUserByEmailArgs, GetUserByIdArgs } from 'types/user'

const prisma = new PrismaClient()

@Resolver(User)
class UserResolvers {
  // QUERIES

  @Query(() => [User])
  async users() {
    return prisma.user.findMany()
  }

  @Query(() => User)
  async user(@Args() { id }: GetUserByIdArgs) {
    return prisma.user.findUnique({ where: { id } })
  }

  @Query(() => User)
  async userByEmail(@Args() { email }: GetUserByEmailArgs) {
    return prisma.user.findUnique({ where: { email } })
  }

  // MUTATIONS

  @Mutation(() => User)
  createUser(@Arg('data') data: CreateUserInput) {
    return prisma.user.create({ data })
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
