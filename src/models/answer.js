import mongoose from 'mongoose'
var Schema = mongoose.Schema

const answerSchema = new mongoose.Schema({
  ans: String,
  quesid: { type: Schema.Types.ObjectId, ref: 'Question' }
}, {
  timestamps: true
})

const Answer = mongoose.model('Answer', answerSchema)

export default Answer
