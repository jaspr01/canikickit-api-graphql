import 'reflect-metadata'
import moduleAlias from 'module-alias'
import path from 'path'

moduleAlias.addAlias('resolvers', path.resolve(__dirname, 'resolvers'))
moduleAlias.addAlias('types', path.resolve(__dirname, 'types'))

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { buildSchema } from 'type-graphql'
import { UserResolvers } from './resolvers'

const init = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolvers],
  })

  const server = new ApolloServer({ schema })

  startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  })
}

init()
