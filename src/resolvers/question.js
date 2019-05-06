// import Joi from 'joi'
// import mongoose from 'mongoose'
// import { UserInputError } from 'apollo-server-express'
import { Question, Answer } from '../models'
import * as Auth from '../auth'

export default {
  Query: {
    questions: (root, args, { req }, info) => {
      Auth.checkSignedIn(req)

      return Question.find({}).populate('ansids')
    },
    question: (root, { id }, { req }, info) => {
      Auth.checkSignedIn(req)
      //   if (!mongoose.Types.ObjectId.isValid()) {
      //     throw new UserInputError(`${id} is not valid question id`)
      //   }
      return Question.findById(id).populate('ansids')
    }
  },
  Mutation: {
    addQuestion: async (root, args, { req }, info) => {
      Auth.checkSignedIn(req)
      //   await Joi.validate(args, addQuestion, { abortEarly: false })
      const question = await Question.create(args)
      return question
    },
    addAnswer: async (root, args, { req }, info) => {
      Auth.checkSignedIn(req)
      // await Joi.validate(args, addAnswer, { abortEarly: false })
      const answer = await Answer.create(args)
      await Question.updateOne({ _id: args.quesid }, { $addToSet: { ansids: answer._id } })
      return answer
    }
  }
}
