import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class GetUserByEmailArgs {
  @Field()
  // TODO: validate email using class-validators
  email: string
}

@ArgsType()
export class GetUserByIdArgs {
  @Field()
  id: string
}
