import session from 'express-session'
import connectRedis from 'connect-redis'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

import { APP_PORT, IN_PROD, DB_HOST, DB_PORT, DB_NAME, SESS_NAME, SESS_SECRET, SESS_LIFETIME, REDIS_HOST,
  REDIS_PORT } from './config'

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

    const RedisStore = connectRedis(session)

    const store = new RedisStore({
      host: REDIS_HOST,
      port: REDIS_PORT
    })

    app.use(session({
      store,
      name: SESS_NAME,
      secret: SESS_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
      }
    }))

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      cors: false,
      playground: IN_PROD ? false : {
        settings: {
          'request.credentials': 'include'
        }
      },
      context: ({ req, res }) => ({ req, res })
    })

    server.applyMiddleware({ app }) // app is from an existing express app

    app.listen({ port: APP_PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (e) {
    console.log(e)
  }
})()
