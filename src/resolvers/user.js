import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { User } from '../models'
import { Signup } from '../schemas'

export default {
  Query: {
    users: (root, args, context, info) => {
      return User.find({})
    },
    user: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid()) {
        throw new UserInputError(`${id} is not valid user id`)
      }
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
      await Joi.validate(args, Signup)
      return User.create(args)
    }
  }
}
