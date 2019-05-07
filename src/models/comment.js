import mongoose from 'mongoose'
var Schema = mongoose.Schema

const commentSchema = new mongoose.Schema({
  comment: String,
  userid: { type: Schema.Types.ObjectId, ref: 'User' },
  quesid: { type: Schema.Types.ObjectId, ref: 'Question' }
}, {
  timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
