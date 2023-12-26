import { Field, InputType } from "type-graphql";
import User from "./object.user";

@InputType({ description: "New user data" })
export class CreateUserInput implements Partial<User> {
  @Field()
  email: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  function?: string

  @Field()
  password?: string
}
