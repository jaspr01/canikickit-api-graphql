import { ObjectType, Field, ID, Int, registerEnumType } from 'type-graphql'
import User from './user'

// ENUMS

enum LegalForm {
  BV = 'BV',
  COMM_V = 'COMM_V',
  CV = 'CV',
  NV = 'NV',
  SOLE_PROPRIETORSHIP = 'SOLE_PROPRIETORSHIP',
  VOF = 'VOF',
  VZW = 'VZW',
}

// REGISTER ENUMS

registerEnumType(LegalForm, {
  name: 'Legal form',
})

// OBJECT

@ObjectType()
class Company {
  @Field(() => ID)
  id: number

  @Field()
  name: string

  @Field()
  enterpriseNumber: string

  @Field(() => LegalForm)
  legalForm: LegalForm

  @Field()
  street: string

  @Field(() => Int)
  number: number

  @Field()
  box: string

  @Field()
  postalCode: string

  @Field()
  city: string

  @Field()
  iban: string

  // TODO: add clients, invoices, timesheetEntries

  @Field(() => [User])
  users: User[]

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

export default Company
