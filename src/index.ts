import moduleAlias from 'module-alias'
import path from 'path'

// Set module aliases
moduleAlias.addAlias('graphql', path.resolve(__dirname, 'graphql'))

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { schema } from './graphql'

const server = new ApolloServer({ schema })

;async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })

  console.log(`🚀  Server ready at: ${url}`)
}
