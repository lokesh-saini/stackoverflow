import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { User } from '../models'
import { signUp, signIn } from '../schemas'
import * as Auth from '../auth'

export default {
  Query: {
    me: async (root, args, { req }, info) => {
      await Auth.checkSignedIn(req)

      return User.findOne({email: req.currentUser.email})
    },
    users: async (root, args, { req }, info) => {
      // console.log('Request', req.session)
      await Auth.checkSignedIn(req)

      return User.find({})
    },
    user: async (root, { id }, { req }, info) => {
      await Auth.checkSignedIn(req)
      if (!mongoose.Types.ObjectId.isValid()) {
        throw new UserInputError(`${id} is not valid user id`)
      }
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      // Auth.checkSignedOut(req)
      await Joi.validate(args, signUp)
      const user = await User.create(args)
      req.session.userId = user.id
      return user
    },
    signIn: async (root, args, { req }, info) => {
      // const { userId } = req.session

      // if (userId) {
      //   return User.findById(userId)
      // }
      await Joi.validate(args, signIn)

      const user = await Auth.attemptSignIn(args.email, args.password)
      req.session.userId = user._id
      // console.log('Session',req.currentUser.email)

      return user
    },
    signOut: async (root, args, { req, res }, info) => {
      await Auth.checkSignedIn(req)
      await User.findByIdAndUpdate(req.session.userId, {token: ''})
      return Auth.signOut(req, res)
    }
  }
}
