import moduleAlias from 'module-alias'
import path from 'path'

// Set module aliases
moduleAlias.addAlias('resolvers', path.resolve(__dirname, 'resolvers'))
moduleAlias.addAlias('typeDefs', path.resolve(__dirname, 'typeDefs'))

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { schema } from './schema'

const server = new ApolloServer({ schema })

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
