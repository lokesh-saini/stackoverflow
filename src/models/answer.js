import mongoose from 'mongoose'
var Schema = mongoose.Schema

const answerSchema = new mongoose.Schema({
  ans: String,
  quesid: { type: Schema.Types.ObjectId, ref: 'Question' },
  userid: { type: Schema.Types.ObjectId, ref: 'User' },
  vote: Number,
  correct: Boolean
}, {
  timestamps: true
})

const Answer = mongoose.model('Answer', answerSchema)

export default Answer
