import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

import { APP_PORT, IN_PROD, DB_HOST, DB_PORT, DB_NAME } from './config'

(async () => {
  try {
    mongoose.set('debug', true) // debugging is on
    await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true })
      .then(() => {
        console.log(`Succesfully Connected to the Mongodb Database at URL : mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
      })
      .catch(() => {
        console.log(`Error Connecting to the Mongodb Database at URL : mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
      })

    const app = express()

    app.disable('x-powered-by')

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: !IN_PROD
    })

    server.applyMiddleware({ app }) // app is from an existing express app

    app.listen({ port: APP_PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (e) {
    console.log(e)
  }
})()
