import { ObjectType, Field, ID } from 'type-graphql'
import Company from './company'

@ObjectType()
class User {
  @Field(() => ID)
  id: number

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

  @Field()
  company_id?: string

  @Field(() => Company)
  company: Company

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

export default User
