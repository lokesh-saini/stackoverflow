import mongoose from 'mongoose'
var Schema = mongoose.Schema

const questionSchema = new mongoose.Schema({
  ques: String,
  ansids: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  userid: { type: Schema.Types.ObjectId, ref: 'User' },
  commentids: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  vote: Number
}, {
  timestamps: true
})

const Question = mongoose.model('Question', questionSchema)

export default Question
