// import Joi from 'joi'
// import mongoose from 'mongoose'
// import { UserInputError } from 'apollo-server-express'
import { Question, Answer, Comment } from '../models'
import * as Auth from '../auth'

export default {
  Query: {
    questions: (root, args, { req }, info) => {
      Auth.checkSignedIn(req)
      return Question.find({}).populate('ansids').populate('commentids')
    },
    question: (root, { id }, { req }, info) => {
      Auth.checkSignedIn(req)
      //   if (!mongoose.Types.ObjectId.isValid()) {
      //     throw new UserInputError(`${id} is not valid question id`)
      //   }
      return Question.findById(id).populate('ansids').populate('commentids')
    }
  },
  Mutation: {
    addQuestion: async (root, args, { req }, info) => {
      Auth.checkSignedIn(req)
      const data = { ...args, ...{ userid: req.session.userId } }
      //   await Joi.validate(args, addQuestion, { abortEarly: false })
      const question = await Question.create(data)
      return question
    },
    addAnswer: async (root, args, { req }, info) => {
      Auth.checkSignedIn(req)
      const data = { ...args, ...{ userid: req.session.userId } }
      // await Joi.validate(args, addAnswer, { abortEarly: false })
      const answer = await Answer.create(data)
      await Question.updateOne({ _id: args.quesid }, { $addToSet: { ansids: answer._id } })
      return answer
    },
    upVoteAnswer: async (root, { id }, { req }, info) => {
      Auth.checkSignedIn(req)
      const vote = await Answer.findOneAndUpdate({ _id: id }, { $inc: { vote: 1 } }, { new: true })
      return vote
    },
    downVoteAnswer: async (root, { id }, { req }, info) => {
      Auth.checkSignedIn(req)
      const vote = await Answer.findOneAndUpdate({ _id: id }, { $inc: { vote: -1 } }, { new: true })
      return vote
    },
    upVoteQuestion: async (root, { id }, { req }, info) => {
      Auth.checkSignedIn(req)
      const vote = await Question.findOneAndUpdate({ _id: id }, { $inc: { vote: 1 } }, { new: true })
      return vote
    },
    downVoteQuestion: async (root, { id }, { req }, info) => {
      Auth.checkSignedIn(req)
      const vote = await Question.findOneAndUpdate({ _id: id }, { $inc: { vote: -1 } }, { new: true })
      return vote
    },
    doCorrectAnswer: async (root, { id }, { req }, info) => {
      Auth.checkSignedIn(req)
      await Auth.checkValidUser(id, req)
      const answer = await Answer.findOneAndUpdate({ _id: id }, { correct: true }, { new: true })
      return answer
    },
    addComment: async (root, args, { req }, info) => {
      Auth.checkSignedIn(req)
      const data = { ...args, ...{ userid: req.session.userId } }
      // await Joi.validate(args, addAnswer, { abortEarly: false })
      const comment = await Comment.create(data)
      await Question.updateOne({ _id: args.quesid }, { $addToSet: { commentids: comment._id } })
      return comment
    }
  }
}
