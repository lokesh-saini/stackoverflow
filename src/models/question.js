import mongoose from 'mongoose'
var Schema = mongoose.Schema

const questionSchema = new mongoose.Schema({
  ques: String,
  ansids: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
}, {
  timestamps: true
})

const Question = mongoose.model('Question', questionSchema)

export default Question
