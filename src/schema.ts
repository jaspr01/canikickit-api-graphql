import { buildSubgraphSchema } from '@apollo/subgraph'
import { UserTypeDefs } from './typeDefs'
import { UserResolvers } from './resolvers'

export const schema = buildSubgraphSchema([
  { typeDefs: UserTypeDefs, resolvers: UserResolvers },
])
